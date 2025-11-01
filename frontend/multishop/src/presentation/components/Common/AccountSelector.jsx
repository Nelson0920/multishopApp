import React, { useMemo, useState } from "react";
import { AccountGroup, SearchInput, AuxiliarInput, AuxiliarRules } from "@components/Common/Inputs";
import LookupList from "@components/Common/LookupList";
import { usePlanCuentas } from "@hooks/PlanCuentas/usePlanCuentas";
import { useDebounce } from "@shared/hooks/useDebounce";
import { useAuxiliaresByLetters } from "@hooks/Auxiliares/useAuxiliaresByLetters";

/**
 * AccountSelector: Selector de cuenta con 0, 1 o 2 auxiliares.
 * - Realiza las búsquedas/queries dentro del componente (plan de cuentas y auxiliares).
 * - Retorna únicamente los IDs seleccionados: { accountId, auxiliary1, auxiliary2 } via onChange.
 */
const AccountSelector = ({
      labelAccount = "Cuenta",
      aux1Number = 1,
      aux2Number = 2,
      numAuxiliaries = 0,
      value = { account: null, auxiliary1: null, auxiliary2: null },
      onChange,
}) => {
      const [currentView, setCurrentView] = useState('form');
      const [listType, setListType] = useState(null); // 'plan_cuentas' | 'auxiliares'
      const [searchTerm, setSearchTerm] = useState("");
      const [selectedAuxIndex, setSelectedAuxIndex] = useState(null); // 1 | 2 | null
      const { debouncedValue: debouncedSearch } = useDebounce(searchTerm, 400);

      // Query de cuentas
      const { data: cuentas = [], isLoading: loadingCuentas } = usePlanCuentas({}, debouncedSearch);

      // Derivar letras para auxiliares según cuenta seleccionada
      //const selectedCuenta = useMemo(() => cuentas.find(c => c.id === value.accountId), [cuentas, value.accountId]);
      const letters = useMemo(() => {
            if (!value.account) return '';
            if (listType !== 'auxiliares') return '';
            if (selectedAuxIndex === 2) {
                  return (value.account?.auxiliar2 ?? '').trim();
            }
            return (value.account?.auxiliar1 ?? '').trim();
      }, [value.account, listType, selectedAuxIndex]);

      // Query de auxiliares por letras
      const { data: auxiliares = [], isLoading: loadingAuxiliares } = useAuxiliaresByLetters(letters || "");

      const openList = (type, auxIndex = null) => {
            setListType(type);
            setSearchTerm("");
            setSelectedAuxIndex(auxIndex);
            setCurrentView('list');
      };

      const closeList = () => {
            setCurrentView('form');
            setListType(null);
            setSearchTerm("");
      };

      const handleSelect = (item) => {
            if (listType === 'plan_cuentas') {
                  onChange?.({ account: item, auxiliary1: null, auxiliary2: null });
            } else if (listType === 'auxiliares') {
                  if (selectedAuxIndex === 2 && numAuxiliaries >= 2) {
                        onChange?.({ ...value, auxiliary2: item });
                  } else if (numAuxiliaries >= 1) {
                        onChange?.({ ...value, auxiliary1: item });
                  }
            }
            closeList();
      };

      // Texto seleccionado
      const accountText = useMemo(() => {
            return value.account ? `${value.account.codigo} - ${value.account.nombre}` : "Seleccionar...";
      }, [value.account]);

      const aux1Text = useMemo(() => {
            return value.auxiliary1 ? `${value.auxiliary1.auxiliar} - ${value.auxiliary1.nombre}` : "Seleccionar...";
      }, [value.auxiliary1]);

      const aux2Text = useMemo(() => {
            return value.auxiliary2 ? `${value.auxiliary2.auxiliar} - ${value.auxiliary2.nombre}` : "Seleccionar...";
      }, [value.auxiliary2]);

      const rulesTextAux1 = useMemo(() => {
            if (!value.account) return "Seleccione primero la cuenta";
            const letters = value.account?.auxiliar1 || "";
            return letters ? `Reglas de auxiliar: ${letters}` : "Sin reglas definidas";
      }, [value.account]);

      const rulesTextAux2 = useMemo(() => {
            if (!value.account) return "Seleccione primero la cuenta";
            const letters = value.account?.auxiliar2 || "";
            return letters ? `Reglas de auxiliar: ${letters}` : "Sin reglas definidas";
      }, [value.account]);

      const items = useMemo(() => listType === 'plan_cuentas' ? cuentas : auxiliares, [listType, cuentas, auxiliares]);
      const isLoading = useMemo(() => listType === 'plan_cuentas' ? loadingCuentas : loadingAuxiliares, [listType, loadingCuentas, loadingAuxiliares]);

      return (
            <>
                  {currentView === 'form' ? (
                        <AccountGroup>
                              <SearchInput
                                    id="account"
                                    name="account"
                                    label={labelAccount}
                                    value={accountText}
                                    onClick={() => openList('plan_cuentas')}
                                    placeholder="Seleccionar cuenta"
                              />

                              {numAuxiliaries >= 1 && (
                                    <>
                                          <AuxiliarInput
                                                id="aux1"
                                                name="aux1"
                                                value={aux1Text}
                                                onClick={() => value.account && openList('auxiliares', 1)}
                                                disabled={!value.account}
                                                auxiliarNumber={aux1Number}
                                          />
                                          <AuxiliarRules rules={rulesTextAux1} />
                                    </>
                              )}
                              {numAuxiliaries >= 2 && (
                                    <>
                                          <AuxiliarInput
                                                id="aux2"
                                                name="aux2"
                                                value={aux2Text}
                                                onClick={() => value.account && openList('auxiliares', 2)}
                                                disabled={!value.account}
                                                auxiliarNumber={aux2Number}
                                          />
                                          <AuxiliarRules rules={rulesTextAux2} />
                                    </>
                              )}


                        </AccountGroup>
                  ) : null}

                  {currentView === 'list' && (
                        <div className="modal-overlay" onClick={closeList}>
                              <div className={`modal-container large-modal`} onClick={(e) => e.stopPropagation()}>
                                    <LookupList
                                          listType={listType}
                                          items={items}
                                          isLoading={isLoading}
                                          searchTerm={searchTerm}
                                          onSearchChange={setSearchTerm}
                                          onSelect={handleSelect}
                                          onBack={closeList}
                                          renderSecondary={(item) => (
                                                item?.nombre
                                          )}
                                    />
                              </div>
                        </div>
                  )}
            </>
      );
};

export default AccountSelector;



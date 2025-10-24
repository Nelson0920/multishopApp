import { useState, useEffect, useCallback, useMemo } from 'react'
import PlanCuentasValidator from '@business/validators/PlanCuentasValidator'

/**
 * Hook para manejo del modal de plan de cuentas
 * Maneja el estado del formulario, validación y envío
 */
export const usePlanCuentasModal = (
      isOpen = false,
      editingCuenta = null,
      onSave = null,
      onClose = null
) => {
      const [formData, setFormData] = useState({
            nombre: '',
            codigo: '',
            auxiliar1: '',
            auxiliar2: '',
            categoria: '',
      })

      const [errors, setErrors] = useState({})
      const [isSubmitting, setIsSubmitting] = useState(false)
      const [touched, setTouched] = useState({})

      const handleCodigoChange = (e) => {
            const value = e.target.value;
            const cleanValue = value.replace(/[^0-9]/g, '');

            let formattedValue = '';
            if (cleanValue.length > 0) {
                  formattedValue = cleanValue[0];
            }
            if (cleanValue.length > 1) {
                  formattedValue += '.' + cleanValue.slice(1, 3);
            }
            if (cleanValue.length > 3) {
                  formattedValue += '.' + cleanValue.slice(3, 4);
            }
            if (cleanValue.length > 4) {
                  formattedValue += '.' + cleanValue.slice(4, 6);
            }

            setFormData(prev => ({
                  ...prev,
                  codigo: formattedValue
            }));
      };

      const handleNombreChange = (e) => {
            const value = e.target.value.toUpperCase();
            const name = value.replace(/[^A-Z ]/g, '');
            setFormData(prev => ({
                  ...prev,
                  nombre: name
            }));
      };

      const handleAuxiliar1Change = (e) => {
            const value = e.target.value.toUpperCase();
            const cleanValue = value.replace(/[^A-Z]/g, '')
                  .replace(/([A-Z])/g, ',$1')
                  .replace(/^,/, '');

            setFormData(prev => ({
                  ...prev,
                  auxiliar1: cleanValue
            }));
      };

      const handleAuxiliar2Change = (e) => {
            const value = e.target.value.toUpperCase();
            const cleanValue = value.replace(/[^A-Z]/g, '')
                  .replace(/([A-Z])/g, ',$1')
                  .replace(/^,/, '');

            setFormData(prev => ({
                  ...prev,
                  auxiliar2: cleanValue
            }));
      };

      const handleCategoriaChange = (e) => {
            const value = e.target.value;
            setFormData(prev => ({
                  ...prev,
                  categoria: value
            }));
      };

      useEffect(() => {
            if (isOpen) {
                  if (editingCuenta) {
                        setFormData({
                              id: editingCuenta.id || '',
                              nombre: editingCuenta.nombre || '',
                              codigo: editingCuenta.codigo || '',
                              auxiliar1: editingCuenta.auxiliar1 || '',
                              auxiliar2: editingCuenta.auxiliar2 || '',
                              categoria: editingCuenta.categoria || '',
                        })
                  } else {
                        setFormData({
                              nombre: '',
                              codigo: '',
                              auxiliar1: '',
                              auxiliar2: '',
                              categoria: '',
                        })
                  }

                  setErrors({})
                  setTouched({})
                  setIsSubmitting(false)
            }
      }, [isOpen, editingCuenta])

      /**
       * Validar formulario completo
       */
      const validateForm = useCallback(() => {
            const validationResult = PlanCuentasValidator.validateCuentaData(formData)

            if (!validationResult.isValid) {
                  setErrors(validationResult.errors)
                  return false
            }

            setErrors({})
            return true
      }, [formData])

      /**
       * Manejar envío del formulario
       */
      const handleSubmit = useCallback(async (e) => {
            e?.preventDefault()

            setIsSubmitting(true)

            try {
                  setTouched({
                        nombre: true,
                        codigo: true,
                        auxiliar1: true,
                        auxiliar2: true,
                        categoria: true,
                  })

                  if (!validateForm()) {
                        setIsSubmitting(false)
                        return
                  }

                  if (onSave) {
                        await onSave(formData)
                  }

                  if (onClose) {
                        onClose()
                  }
            } finally {
                  setIsSubmitting(false)
            }
      }, [formData, validateForm, onSave, onClose])

      /**
       * Manejar cierre del modal
       */
      const handleClose = useCallback(() => {
            if (onClose) {
                  onClose()
            }
      }, [onClose])

      /**
       * Verificar si el formulario es válido
       */
      const isFormValid = useMemo(() => {
            const codigoFormatValid = formData.codigo.match(/^\d+(\.\d+)*$/)
            return Object.keys(errors).length === 0 &&
                  codigoFormatValid &&
                  formData.nombre.trim() !== ''
      }, [errors, formData])

      /**
       * Verificar si hay cambios sin guardar
       */
      const hasUnsavedChanges = useMemo(() => {
            if (!editingCuenta) {
                  return formData.nombre.trim() !== '' ||
                        formData.codigo.trim() !== '' ||
                        formData.auxiliar1.trim() !== '' ||
                        formData.auxiliar2.trim() !== '' ||
                        formData.categoria.trim() !== ''
            }

            return formData.nombre !== editingCuenta.nombre ||
                  formData.codigo !== editingCuenta.codigo ||
                  formData.auxiliar1 !== editingCuenta.auxiliar1 ||
                  formData.auxiliar2 !== editingCuenta.auxiliar2 ||
                  formData.categoria !== editingCuenta.categoria
      }, [formData, editingCuenta])

      return {
            formData,

            errors,
            touched,
            isSubmitting,
            isFormValid,
            hasUnsavedChanges,

            handleCodigoChange,
            handleNombreChange,
            handleAuxiliar1Change,
            handleAuxiliar2Change,
            handleCategoriaChange,
            handleSubmit,
            handleClose,

            validateForm,
      }
}

export default usePlanCuentasModal

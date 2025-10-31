import { useState, useEffect, useCallback, useMemo } from 'react'
import AuxiliaresValidator from '@business/validators/AuxiliaresValidator'

/**
 * Hook para manejo del modal de auxiliares
 * Maneja el estado del formulario, validación y envío
 */
export const useAuxiliaresModal = (
      isOpen = false,
      editingAuxiliar = null,
      onSave = null,
      onClose = null
) => {
      const [formData, setFormData] = useState({
            auxiliar: '',
            nombre: '',
      })

      const [errors, setErrors] = useState({})
      const [isSubmitting, setIsSubmitting] = useState(false)
      const [touched, setTouched] = useState({})

      const handleLetterChange = (e) => {
            const value = e.target.value.toUpperCase();
            const letter = value.replace(/[^A-Z]/g, '').substring(value.length - 1, value.length);
            if (errors.auxiliar) {
                  setErrors(prev => ({
                        ...prev,
                        auxiliar: null
                  }));
            }
            setFormData(prev => ({
                  ...prev,
                  auxiliar: letter
            }));
      };

      const handleNombreChange = (e) => {
            const value = e.target.value.toUpperCase();
            const name = value.replace(/[^A-Z ]/g, '');
            if (errors.nombre) {
                  setErrors(prev => ({
                        ...prev,
                        nombre: null
                  }));
            }
            setFormData(prev => ({
                  ...prev,
                  nombre: name
            }));
      };

      useEffect(() => {
            if (isOpen) {
                  if (editingAuxiliar) {
                        const letter = editingAuxiliar.auxiliar.substring(0, 1);
                        setFormData({
                              id: editingAuxiliar.id || '',
                              auxiliar: letter || '',
                              nombre: editingAuxiliar.nombre || '',
                        })
                  } else {
                        setFormData({
                              auxiliar: '',
                              nombre: '',
                        })
                  }

                  setErrors({})
                  setTouched({})
                  setIsSubmitting(false)
            }
      }, [isOpen, editingAuxiliar])

      /**
       * Validar formulario completo
       */
      const validateForm = useCallback(() => {
            const validationResult = AuxiliaresValidator.validateAuxiliarData(formData)

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
                        auxiliar: true,
                        nombre: true,
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
            const errorsArray = Object.keys(errors).filter(error => errors[error] !== null);
            return errorsArray.length === 0 &&
                  formData.nombre.trim() !== ''
      }, [errors, formData])

      /**
       * Verificar si hay cambios sin guardar
       */
      const hasUnsavedChanges = useMemo(() => {
            if (!editingAuxiliar) {
                  return formData.auxiliar.trim() !== '' ||
                        formData.nombre.trim() !== ''
            }

            return formData.auxiliar !== editingAuxiliar.auxiliar ||
                  formData.nombre !== editingAuxiliar.nombre
      }, [formData, editingAuxiliar])

      return {
            formData,

            errors,
            touched,
            isSubmitting,
            isFormValid,
            hasUnsavedChanges,

            handleLetterChange,
            handleNombreChange,
            handleSubmit,
            handleClose,

            validateForm,
      }
}

export default useAuxiliaresModal

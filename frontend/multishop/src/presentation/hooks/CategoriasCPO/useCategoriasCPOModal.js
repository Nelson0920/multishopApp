import { useState, useEffect, useCallback, useMemo } from 'react'
import CategoriasCPOValidator from '@business/validators/CategoriasCPOValidator'

/**
 * Hook para manejo del modal de categorías CPO
 * Maneja el estado del formulario, validación y envío
 */
export const useCategoriasCPOModal = (
      isOpen = false,
      editingCategoria = null,
      onSave = null,
      onClose = null
) => {
      const [formData, setFormData] = useState({
            nombre: '',
            descuento: 0,
            ganancia: 0,
            gestionBanda: false,
      })

      const [errors, setErrors] = useState({})
      const [isSubmitting, setIsSubmitting] = useState(false)
      const [touched, setTouched] = useState({})

      const handleNombreChange = (e) => {
            const value = e.target.value;
            setFormData(prev => ({
                  ...prev,
                  nombre: value
            }));
      };

      const handleDescuentoChange = (e) => {
            const value = parseFloat(e.target.value) || 0;
            setFormData(prev => ({
                  ...prev,
                  descuento: value
            }));
      };

      const handleGananciaChange = (e) => {
            const value = parseFloat(e.target.value) || 0;
            setFormData(prev => ({
                  ...prev,
                  ganancia: value
            }));
      };

      const handleGestionBandaChange = (e) => {
            const value = e.target.checked;
            setFormData(prev => ({
                  ...prev,
                  gestionBanda: value
            }));
      };

      useEffect(() => {
            if (isOpen) {
                  if (editingCategoria) {
                        setFormData({
                              id: editingCategoria.id || '',
                              nombre: editingCategoria.nombre || '',
                              descuento: editingCategoria.descuento || 0,
                              ganancia: editingCategoria.ganancia || 0,
                              gestionBanda: editingCategoria.gestionBanda || false,
                        })
                  } else {
                        setFormData({
                              nombre: '',
                              descuento: 0,
                              ganancia: 0,
                              gestionBanda: false,
                        })
                  }

                  setErrors({})
                  setTouched({})
                  setIsSubmitting(false)
            }
      }, [isOpen, editingCategoria])

      /**
       * Validar formulario completo
       */
      const validateForm = useCallback(() => {
            const validationResult = CategoriasCPOValidator.validateCategoriaData(formData)

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
                        descuento: true,
                        ganancia: true,
                        gestionBanda: true,
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
            return Object.keys(errors).length === 0 &&
                  formData.nombre.trim() !== '' &&
                  formData.descuento >= 0 &&
                  formData.descuento <= 100 &&
                  formData.ganancia >= 0 &&
                  formData.ganancia <= 100
      }, [errors, formData])

      /**
       * Verificar si hay cambios sin guardar
       */
      const hasUnsavedChanges = useMemo(() => {
            if (!editingCategoria) {
                  return formData.nombre.trim() !== '' ||
                        formData.descuento !== 0 ||
                        formData.ganancia !== 0 ||
                        formData.gestionBanda !== false
            }

            return formData.nombre !== editingCategoria.nombre ||
                  formData.descuento !== editingCategoria.descuento ||
                  formData.ganancia !== editingCategoria.ganancia ||
                  formData.gestionBanda !== editingCategoria.gestionBanda
      }, [formData, editingCategoria])

      return {
            formData,

            errors,
            touched,
            isSubmitting,
            isFormValid,
            hasUnsavedChanges,

            handleNombreChange,
            handleDescuentoChange,
            handleGananciaChange,
            handleGestionBandaChange,
            handleSubmit,
            handleClose,

            validateForm,
      }
}

export default useCategoriasCPOModal

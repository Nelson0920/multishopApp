import { useState, useEffect, useCallback, useMemo } from 'react'
import AsignacionISRLValidator from '@business/validators/AsignacionISRLValidator'

/**
 * Hook para manejo del modal de conceptos de retención ISRL
 * Maneja el estado del formulario, validación y envío
 */
export const useAsignacionISRLModal = (
      isOpen = false,
      editingConcept = null,
      onSave = null,
      onClose = null
) => {
      const [formData, setFormData] = useState({
            code: '',
            name: '',
            percentage_pn: '',
            percentage_pj: '',
            subtrahend_amount_pn: '',
            subtrahend_amount_pj: ''
      })

      const [errors, setErrors] = useState({})
      const [isSubmitting, setIsSubmitting] = useState(false)
      const [touched, setTouched] = useState({})

      const handleCodeChange = (e) => {
            const value = e.target.value.toUpperCase();
            const code = value.replace(/[^A-Z0-9]/g, '');
            setFormData(prev => ({
                  ...prev,
                  code: code
            }));
      };

      const handleNameChange = (e) => {
            const value = e.target.value;
            setFormData(prev => ({
                  ...prev,
                  name: value
            }));
      };

      const handlePercentageChange = (e) => {
            const value = e.target.value;
            const numericValue = parseFloat(value);
            if (isNaN(numericValue) || numericValue < 0 || numericValue > 100) return;
            setFormData(prev => ({
                  ...prev,
                  [e.target.name]: value
            }));
      };

      const handleAmountChange = (e) => {
            const value = e.target.value;
            const numericValue = parseFloat(value);
            if (isNaN(numericValue) || numericValue < 0) return;
            setFormData(prev => ({
                  ...prev,
                  [e.target.name]: value
            }));
      };

      useEffect(() => {
            if (isOpen) {
                  if (editingConcept) {
                        setFormData({
                              id: editingConcept.id || '',
                              code: editingConcept.code || '',
                              name: editingConcept.name || '',
                              percentage_pn: editingConcept.percentage_pn || '',
                              percentage_pj: editingConcept.percentage_pj || '',
                              subtrahend_amount_pn: editingConcept.subtrahend_amount_pn || '',
                              subtrahend_amount_pj: editingConcept.subtrahend_amount_pj || ''
                        })
                  } else {
                        setFormData({
                              code: '',
                              name: '',
                              percentage_pn: '',
                              percentage_pj: '',
                              subtrahend_amount_pn: '',
                              subtrahend_amount_pj: ''
                        })
                  }

                  setErrors({})
                  setTouched({})
                  setIsSubmitting(false)
            }
      }, [isOpen, editingConcept])

      /**
       * Validar formulario completo
       */
      const validateForm = useCallback(() => {
            const validationResult = AsignacionISRLValidator.validateConceptData(formData)

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
                        code: true,
                        name: true,
                        percentage_pn: true,
                        percentage_pj: true,
                        subtrahend_amount_pn: true,
                        subtrahend_amount_pj: true
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
                  formData.code.trim() !== '' &&
                  formData.name.trim() !== '' &&
                  formData.percentage_pn !== '' &&
                  formData.percentage_pj !== '' &&
                  formData.subtrahend_amount_pn !== '' &&
                  parseFloat(formData.percentage_pn) >= 0 &&
                  parseFloat(formData.percentage_pn) <= 100 &&
                  parseFloat(formData.percentage_pj) >= 0 &&
                  parseFloat(formData.percentage_pj) <= 100 &&
                  parseFloat(formData.subtrahend_amount_pn) >= 0
      }, [errors, formData])

      /**
       * Verificar si hay cambios sin guardar
       */
      const hasUnsavedChanges = useMemo(() => {
            if (!editingConcept) {
                  return formData.code.trim() !== '' ||
                        formData.name.trim() !== '' ||
                        formData.percentage_pn !== '' ||
                        formData.percentage_pj !== '' ||
                        formData.subtrahend_amount_pn !== '' ||
                        formData.subtrahend_amount_pj !== ''
            }

            return formData.code !== editingConcept.code ||
                  formData.name !== editingConcept.name ||
                  formData.percentage_pn !== editingConcept.percentage_pn ||
                  formData.percentage_pj !== editingConcept.percentage_pj ||
                  formData.subtrahend_amount_pn !== editingConcept.subtrahend_amount_pn ||
                  formData.subtrahend_amount_pj !== editingConcept.subtrahend_amount_pj
      }, [formData, editingConcept])

      return {
            formData,

            errors,
            touched,
            isSubmitting,
            isFormValid,
            hasUnsavedChanges,

            handleCodeChange,
            handleNameChange,
            handlePercentageChange,
            handleAmountChange,
            handleSubmit,
            handleClose,

            validateForm,
      }
}

export default useAsignacionISRLModal

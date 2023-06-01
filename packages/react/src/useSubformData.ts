import {
  useContext,
  useMemo,
} from 'react'

import {
  SubformContext,
  SubformContextType,
} from './SubformContext'

type SubformWrapperType = {
  func: (...args: any) => void,
  subformId: symbol,
}

export const useSubformData = <
  ValueType
>() => {
  const subformId = (
    useMemo(
      () => (
        Symbol()
      ),
      [],
    )
  )

  const subformContext = (
    useContext<
      SubformContextType<
        ValueType
      >
    >(
      SubformContext
    )
  )

  const addSubformIdToRemoveFunction = ({
    func,
    subformId,
  }: (
    SubformWrapperType
  )) => (
    () => (
      func(
        subformId,
      )
    )
  )

  const addSubformIdToAddFunction = ({
    func,
    subformId,
  }: (
    SubformWrapperType
  )) => (
    (
      value: (
        Parameters<
          typeof func
        >[1]
      ),
    ) => (
      func(
        subformId,
        value,
      )
    )
  )

  return {
    addErrorMessages: (
      addSubformIdToAddFunction({
        func: subformContext.addErrorMessages,
        subformId,
      })
    ),
    addGroupValidations: (
      addSubformIdToAddFunction({
        func: subformContext.addGroupValidations,
        subformId,
      })
    ),
    addOnChange: (
      addSubformIdToAddFunction({
        func: subformContext.addOnChange,
        subformId,
      })
    ),
    addOnSubmit: (
      addSubformIdToAddFunction({
        func: subformContext.addOnSubmit,
        subformId,
      })
    ),
    addUpdatedErrorMessages: (
      addSubformIdToAddFunction({
        func: subformContext.addUpdatedErrorMessages,
        subformId,
      })
    ),
    addUpdatedValues: (
      addSubformIdToAddFunction({
        func: subformContext.addUpdatedValues,
        subformId,
      })
    ),
    addValidations: (
      addSubformIdToAddFunction({
        func: subformContext.addValidations,
        subformId,
      })
    ),
    addValues: (
      addSubformIdToAddFunction({
        func: subformContext.addValues,
        subformId,
      })
    ),
    removeErrorMessages: (
      addSubformIdToRemoveFunction({
        func: subformContext.removeErrorMessages,
        subformId,
      })
    ),
    removeGroupValidations: (
      addSubformIdToRemoveFunction({
        func: subformContext.removeGroupValidations,
        subformId,
      })
    ),
    removeOnChange: (
      addSubformIdToRemoveFunction({
        func: subformContext.removeOnChange,
        subformId,
      })
    ),
    removeOnSubmit: (
      addSubformIdToRemoveFunction({
        func: subformContext.removeOnSubmit,
        subformId,
      })
    ),
    removeUpdatedErrorMessages: (
      addSubformIdToRemoveFunction({
        func: subformContext.removeUpdatedErrorMessages,
        subformId,
      })
    ),
    removeUpdatedValues: (
      addSubformIdToRemoveFunction({
        func: subformContext.removeUpdatedValues,
        subformId,
      })
    ),
    removeValidations: (
      addSubformIdToRemoveFunction({
        func: subformContext.removeValidations,
        subformId,
      })
    ),
    removeValues: (
      addSubformIdToRemoveFunction({
        func: subformContext.removeValues,
        subformId,
      })
    ),
  } satisfies (
    SubformContextType<
      ValueType
    >
  )
}

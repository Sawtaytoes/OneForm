/// <reference types="react" />

import { JSXElementConstructor } from "react";
import { MemoExoticComponent } from "react";
import { ReactElement } from "react";
import { ReactNode } from "react";
import { SyntheticEvent } from "react";

declare type CleanupFunction = () => void;

export declare type ErrorMessage = string | boolean;

export declare const Field: MemoExoticComponent<
  ({
    children,
    isCheckboxElement,
    isMultipleElement,
    translateProps,
  }: FieldProps) => JSX.Element
>;

export declare const FieldErrorMessage: MemoExoticComponent<
  ({ name }: { name: string }) => JSX.Element
>;

export declare const FieldGroup: MemoExoticComponent<
  ({
    children,
    id,
    name,
  }: {
    children: ReactNode;
    id: string;
    name: string;
  }) => JSX.Element
>;

export declare interface FieldProps {
  children: ReactElement;
  isCheckboxElement?: boolean;
  isMultipleElement?: boolean;
  translateProps?: (props: TranslateProps) => object;
}

export declare const FieldValue: MemoExoticComponent<
  ({ name }: { name: string }) => JSX.Element
>;

declare const enum FormChangeState {
  committed = "committed",
  staged = "staged",
  unchanged = "unchanged",
}

declare interface GroupValidation {
  fieldNames: string[];
  groupNames: string[];
  getErrorMessages: (props: {
    groups: Record<
      string,
      {
        groupId: string;
        groupName: string;
        groupString: string;
      }
    >;
    groupsString: string;
    reverseLookup: Record<string, string>;
    validationType: ValidationType;
    values: Record<string, any>;
  }) => Record<string, string | string[]>;
}

declare interface IdentifierErrors {
  identifier: string;
  error: {
    errorMessages: ErrorMessage[];
    symbol: symbol;
  };
}

export declare const IfFieldErrorMessage: MemoExoticComponent<
  ({
    children,
    fallback,
    getIsVisible,
    name,
  }: {
    children?: ReactNode;
    fallback?: ReactNode;
    getIsVisible?:
      | ((errorMessages: ErrorMessage | ErrorMessage[]) => boolean)
      | undefined;
    name: string;
  }) => JSX.Element
>;

export declare const IfFieldValue: MemoExoticComponent<
  ({
    children,
    fallback,
    getIsVisible,
    name,
  }: {
    children?: ReactNode;
    fallback?: ReactNode;
    getIsVisible?: ((value: any) => boolean) | undefined;
    name: string;
  }) => JSX.Element
>;

export declare const IfFieldVisitation: MemoExoticComponent<
  ({
    children,
    fallback,
    name,
  }: {
    children?: ReactNode;
    fallback?: ReactNode;
    name: string;
  }) => JSX.Element
>;

export declare const MaterialUiField: MemoExoticComponent<
  ({ children, ...otherProps }: FieldProps) => JSX.Element
>;

export declare type OnChangeHandler = (props: {
  fieldName: string;
  value: any;
  values: Record<string, any>;
}) => Record<string, any> | void;

export declare const OneForm: MemoExoticComponent<
  ({
    children,
    errorMessages: rootErrorMessages,
    groupValidations: rootGroupValidations,
    hasFieldChangeValidation,
    onChange: rootOnChange,
    onSubmit: rootOnSubmit,
    updatedErrorMessages: rootUpdatedErrorMessages,
    updatedValues: rootUpdatedValues,
    validations: rootValidations,
    values: rootValues,
  }: OneFormProps) => JSX.Element
>;

export declare interface OneFormProps {
  children: ReactNode;
  errorMessages?: Record<string, ErrorMessage | ErrorMessage[]>;
  groupValidations?: GroupValidation[];
  hasFieldChangeValidation?: boolean;
  onChange?: OnChangeHandler;
  onSubmit?: OnSubmitHandler;
  updatedErrorMessages?: Record<string, any>;
  updatedValues?: Record<string, any>;
  validations?: Record<string, any>;
  values?: Record<string, any>;
}

export declare type OnSubmitHandler = Exclude<
  Exclude<Parameters<typeof useSubmissionState>[0], undefined>["onSubmit"],
  undefined
>;

export declare type SetErrorMessagesFunction = (
  identifier: string,
  errors: IdentifierErrors["error"]
) => void;

export declare const Subfield: MemoExoticComponent<
  ({
    children,
  }: SubfieldProps) => ReactElement<any, string | JSXElementConstructor<any>>
>;

export declare interface SubfieldProps {
  children: ReactElement;
}

export declare const Subform: MemoExoticComponent<
  ({
    errorMessages,
    groupValidations,
    onChange,
    onSubmit,
    updatedErrorMessages,
    updatedValues,
    validations,
    values,
  }: SubformProps) => null
>;

declare type SubformProps = Parameters<typeof useSubformEffect>[0];

declare const enum SubmissionStates {
  failedSubmission = "failedSubmission",
  invalidSubmission = "invalidSubmission",
  notSubmitted = "notSubmitted",
  pendingSubmission = "pendingSubmission",
  submitted = "submitted",
}

export declare const SubmitField: MemoExoticComponent<
  ({
    children,
    fallback,
    getIsVisible,
    isDisabledWhenInvalid,
  }: SubmitFieldProps) => ReactElement<
    any,
    string | JSXElementConstructor<any>
  > | null
>;

export declare interface SubmitFieldProps {
  children: ReactElement;
  fallback?: ReactElement;
  getIsVisible?: (props: {
    formChangeState: FormChangeState;
    isFormValid: boolean;
    isSubmitting: boolean;
    submissionState: SubmissionStates;
    totalErrorMessages: number;
  }) => boolean;
  isDisabledWhenInvalid?: boolean;
}

declare type Subscriber<T> = (value: T) => Unsubscriber;

export declare interface TranslateProps {
  errorMessages: string[];
  fieldName: string;
  isChecked: boolean;
  isVisited: boolean;
  updateFieldValue: (event: SyntheticEvent) => void;
  value: any;
  visitField: (event: SyntheticEvent) => void;
}

declare type Unsubscriber = (() => void) | void;

export declare const useField: ({
  inputValue,
  isCheckboxElement,
  isMultipleElement,
  name,
  onChange,
  onVisit,
}: UseFieldProps) => {
  errorMessages: string[];
  fieldName: string;
  isChecked: boolean;
  isVisited: boolean;
  updateFieldValue: (event: SyntheticEvent) => void;
  value: any;
  visitField: (event: SyntheticEvent) => void;
};

export declare const useFieldData: <T = any>({
  name,
}: {
  name: string;
}) => {
  errorMessages: string[];
  fieldName: string;
  isVisited: boolean;
  register: () => CleanupFunction;
  setErrorMessages: (
    errorMessages: string | boolean | string[] | undefined
  ) => void;
  setValue: (value: T) => void;
  setVisited: () => void;
  value: T;
};

export declare const useFieldErrorMessages: ({ name }: { name: string }) => {
  errorMessages: string[];
  setErrorMessages: (
    errorMessages: string | string[] | boolean | undefined
  ) => void;
};

export declare const useFieldName: ({ name }: { name: string }) => {
  fieldName: string;
};

export declare interface UseFieldProps {
  inputValue: string | undefined;
  isCheckboxElement: boolean;
  isMultipleElement: boolean;
  name: string;
  onChange: (event: SyntheticEvent) => void;
  onVisit: (event: SyntheticEvent) => void;
}

export declare const useFieldRegistration: ({ name }: { name: string }) => {
  register: () => CleanupFunction;
};

export declare const useFieldValue: <T = any>({
  name,
}: {
  name: string;
}) => {
  setValue: (value: T) => void;
  value: T;
};

export declare const useFieldVisitation: ({ name }: { name: string }) => {
  isVisited: boolean;
  setVisited: () => void;
};

export declare const useFormSubmission: ({
  requiredFieldNames,
}?: {
  requiredFieldNames?: string[] | undefined;
}) => {
  formChangeState: FormChangeState;
  getErrorMessages: () => string[];
  isSubmitting: boolean;
  isValid: boolean;
  isValidForSubmission: boolean;
  isVisited: boolean;
  submissionState: SubmissionStates;
  submitForm: (event: SyntheticEvent<Element, Event>) => void;
  totalErrorMessages: number;
  totalUnvisitedFields: number;
  totalVisitedFields: number;
};

export declare const useIsCheckboxElement: (
  reactElement: ReactElement
) => boolean;

export declare const useIsHtmlElement: ({
  type: reactElementType,
}: ReactElement) => boolean;

export declare const useIsMultipleElement: (
  reactElement: ReactElement
) => boolean;

export declare const useSubfield: ({ inputValue }: { inputValue: any }) => {
  isSelected: any;
};

export declare const useSubformEffect: ({
  errorMessages,
  groupValidations,
  onChange,
  onSubmit,
  updatedErrorMessages,
  updatedValues,
  validations,
  values,
}: {
  errorMessages: Record<string, ErrorMessage | ErrorMessage[]>;
  groupValidations: GroupValidation[];
  onChange: OnChangeHandler;
  onSubmit: OnSubmitHandler;
  updatedErrorMessages: Record<string, any>;
  updatedValues: Record<string, any>;
  validations: Record<string, any>;
  values: any[];
}) => void;

declare const useSubmissionState: ({
  getAllIdentifiers,
  getAllValues,
  getIsValid,
  onBeforeSubmit,
  onInvalidSubmit,
  onSubmit,
}?: {
  getAllIdentifiers?: (() => Record<string, any>) | undefined;
  getAllValues?: (() => Record<string, any>) | undefined;
  getIsValid?: (() => boolean) | undefined;
  onBeforeSubmit?: (() => void) | undefined;
  onInvalidSubmit?: (() => void) | undefined;
  onSubmit?:
    | ((props: {
        allValues: Record<string, any>;
        registeredValues: Record<string, any>;
      }) => void | Promise<void>)
    | undefined;
}) => {
  formSubmitted: () => void;
  getSubmissionState: () => SubmissionStates;
  subscribeToSubmissionState: (
    subscriber: Subscriber<SubmissionStates> | undefined
  ) => Unsubscriber;
};

declare const enum ValidationType {
  change = "change",
  submit = "submit",
}

export {};

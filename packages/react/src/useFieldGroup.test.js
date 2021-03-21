import {
	renderHook,
} from '@testing-library/react-hooks'

import FieldGroup from './FieldGroup.jsx'
import OneForm from './OneForm.jsx'
import useFieldGroup from './useFieldGroup.js'

describe(
	'useFieldGroup',
	() => {
		test(
			'adds field group to initial parent',
			() => {
				const fieldGroupProps = {
					name: 'addressId',
					value: '1',
				}

				const {
					result,
				} = (
					renderHook(
						useFieldGroup,
						{
							initialProps: (
								fieldGroupProps
							),
							wrapper: (
								OneForm
							),
						},
					)
				)

				expect(
					result
					.current
					.fieldGroups
				)
				.toEqual([
					fieldGroupProps,
				])
			}
		)

		test(
			'adds field group to field group parent',
			() => {
				const fieldGroup1Props = {
					name: 'addressId',
					value: '1',
				}

				const Wrapper = ({
					// eslint-disable-next-line react/prop-types
					children,
				}) => (
					<OneForm>
						<FieldGroup
							{...fieldGroup1Props}
						>
							{children}
						</FieldGroup>
					</OneForm>
				)

				const fieldGroup2Props = {
					name: 'emailId',
					value: '1',
				}

				const {
					result,
				} = (
					renderHook(
						useFieldGroup,
						{
							initialProps: (
								fieldGroup2Props
							),
							wrapper: (
								Wrapper
							),
						},
					)
				)

				expect(
					result
					.current
					.fieldGroups
				)
				.toEqual([
					fieldGroup1Props,
					fieldGroup2Props,
				])
			}
		)

		test(
			'updates field group when values change',
			() => {
				const fieldGroup1Props = {
					name: 'addressId',
					value: '1',
				}

				const Wrapper = ({
					// eslint-disable-next-line react/prop-types
					children,
				}) => (
					<OneForm>
						<FieldGroup
							{...fieldGroup1Props}
						>
							{children}
						</FieldGroup>
					</OneForm>
				)

				const {
					rerender,
					result,
				} = (
					renderHook(
						useFieldGroup,
						{
							initialProps: {
								name: 'emailId',
								value: '1',
							},
							wrapper: (
								Wrapper
							),
						},
					)
				)

				const fieldGroup2Props = {
					name: 'phoneId',
					value: '2',
				}

				rerender(
					fieldGroup2Props
				)

				expect(
					result
					.current
					.fieldGroups
				)
				.toEqual([
					fieldGroup1Props,
					fieldGroup2Props,
				])
			}
		)
	}
)

const VanillaReactStyles = () => (
	<style>
		{
			`
				*,
				*::before,
				*::after {
					box-sizing: border-box;
					color: #333;
					font-family: sans-serif;
					font-size: 24px;
				}

				button,
				input {
					border: 0;
					margin-bottom: 6px;
					margin-top: 6px;
					outline: 0;
					padding: 10px;
				}

				button {
					background-color: #ccc;
					border-radius: 10px;
				}

				button:hover {
					background-color: #eee;
				}

				button:focus {
					background-color: #ddd;
				}

				input {
					background-color: #ddd;
					border-radius: 10px;
				}

				input:hover,
				input:focus {
					background-color: #eee;
				}

				input[type="checkbox"] {
					height: 20px;
					margin-right: 10px;
					width: 20px;
				}

				input[data-visited] {
					background-color: limegreen;
				}

				input[data-error] {
					background-color: tomato;
				}

				label {
					align-items: center;
					display: flex;
				}
			`
		}
	</style>
)

export default VanillaReactStyles

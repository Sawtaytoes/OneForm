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

				body {
					background-color: #e0e0da;
				}

				label {
					align-items: center;
					display: flex;
				}

				button,
				input,
				option,
				select {
					background-color: #fff;
					border-radius: 10px;
					border: 2px solid transparent;
					margin-bottom: 6px;
					margin-top: 6px;
					outline: 0;
					padding: 10px;
				}

				button {
					box-shadow: rgb(170, 170, 170) 0 4px 0 0;
				}

				button:hover {
					box-shadow: rgb(170, 170, 170) 0 2px 0 0;
					position: relative;
					top: 2px;
				}

				button:active {
					box-shadow: rgb(170, 170, 170) 0 0 0 0;
					position: relative;
					top: 4px;
				}

				input:focus {
					border: 2px solid rgba(128, 128, 128, 0.5);
				}

				input[type="checkbox"] {
					height: 20px;
					margin-right: 10px;
					width: 20px;
				}

				[data-visited] {
					border-color: #88f;
				}

				input[data-error] {
					border-color: #f00;
				}

				option {
					border: 2px solid #ccc;
					padding: 20px;
				}

				option:checked {
					border: 2px solid rgba(128, 128, 128, 0.5);
				}

				[data-loading]::before {
					content: '⌛ ';
				}

				[data-submission-state="invalidSubmission"] {
					background-color: tomato;
					box-shadow: rgb(128, 0, 0) 0 4px 0 0;
				}

				[data-submission-state="invalidSubmission"]:hover {
					background-color: tomato;
					box-shadow: rgb(128, 0, 0) 0 2px 0 0;
				}

				[data-submission-state="invalidSubmission"]:active {
					background-color: tomato;
					box-shadow: rgb(128, 0, 0) 0 0 0 0;
				}

				[data-submission-state="pendingSubmission"] {
					background-color: yellow;
					box-shadow: rgb(128, 128, 0) 0 4px 0 0;
				}

				[data-submission-state="pendingSubmission"]:hover {
					background-color: yellow;
					box-shadow: rgb(128, 128, 0) 0 2px 0 0;
				}

				[data-submission-state="pendingSubmission"]:active {
					background-color: yellow;
					box-shadow: rgb(128, 128, 0) 0 0 0 0;
				}

				[data-submission-state="submitted"] {
					background-color: limegreen;
					box-shadow: rgb(0, 128, 0) 0 4px 0 0;
				}

				[data-submission-state="submitted"]:hover {
					background-color: limegreen;
					box-shadow: rgb(0, 128, 0) 0 2px 0 0;
				}

				[data-submission-state="submitted"]:active {
					background-color: limegreen;
					box-shadow: rgb(0, 128, 0) 0 0 0 0;
				}
			`
		}
	</style>
)

export default VanillaReactStyles

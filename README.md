# Angular: Calculator Component

## Environment 
- Angular CLI Version: 10.0.4
- Angular Core Version: 10.0.4
- Node Version: 12(LTS)
- Default Port: 8000

## Application Demo:

![](https://hrcdn.net/s3_pub/istreet-assets/DyjKYetGu_F8Hiko6qd3fw/calculator.gif)

## Functionality Requirements

The component should have the following functionalities:

- There are 2 input boxes for entering values.

- There are 4 buttons that perform mathematical operations to calculate the result:
  - `+` performs addition
  - `-` performs subtraction
  - `*` performs multiplication
  - `/` performs division

- Whenever you click any of these 4 buttons, an operation is performed and the result is calculated. This result is rendered in the following format: `Result: {result}`. Here, {result} is the result calculated.
  - This div should be rendered only when some result has been calculated. Initially, since no operation is performed, this div should not be rendered.

- The label between the 2 input boxes displays the current operation. The initial operation to show in the label is `+`.

- Maintain the total count of operations performed. The count is rendered in the following div: `<h4 data-test-id="total-operations">Total operations performed: {count}</h4>`. Here, {count} is the total number of operations performed. Initially, this value should be 0.

- There is a `Reset` button, which, when clicked, clears the input boxes, sets the selected operator back to its default value `+`, and clears the result value (thus not rendering the result div). It does not reset the total operations count.

## Testing Requirements

- The total operations div should have the data-test-id attribute `total-operations`.
- Input for the first number should have the data-test-id attribute `app-input1`.
- Input for the second number should have the data-test-id attribute `app-input2`.
- The label to show the selected operator should have the data-test-id attribute `selected-operator`.
- The add button should have the data-test-id attribute `addButton`.
- The subtract button should have the data-test-id attribute `subtractButton`.
- The multiply button should have the data-test-id attribute `multiplyButton`.
- The divide button should have the data-test-id attribute `divideButton`.
- The result div should have the data-test-id attribute `result`.
- The `Reset` button should have the data-test-id attribute `resetButton`.

## Project Specifications

**Read Only Files**
- src/app/app.component.spec.ts
- src/app/calculator/calculator.component.spec.ts

**Commands**
- run: 
```bash
bash bin/env_setup && . $HOME/.nvm/nvm.sh && npm start
```
- install: 
```bash
bash bin/env_setup && . $HOME/.nvm/nvm.sh && npm install
```
- test: 
```bash
bash bin/env_setup && . $HOME/.nvm/nvm.sh && npm test
```

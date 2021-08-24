- Write tests for updating values in `onChange` that update other values.
- Accumulate changes in `onChange` prior to publishing updates and do them in order.

So instead of publishing after every value is set, publish only after all subsequent or queued changes are completely processed first. This ensures all values are updated first, then publishing can occur.

Thing is, it will still trigger `onChange` to run again even more, but it shouldn't.

`fallback` should be 2 components with context in `IfFieldValue`.

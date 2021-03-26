---
description: Please don't.
---

# How do I only validate on submit?

This prop validates fields when their values are changing. Setting it to `false` only validates on form submission.

The only reason this value exists is because people are still writing requirements that forms only validate on submit.

There may be performance reasons for this; although, `validationType` is passed in each validation function to make that easier to manage on a per-field level without having to globally disable it in OneForm.

{% hint style="info" %}
Instant validation on field changes is almost always more useful to a user than having them blindly fix fields. Leave this `true` unless you know what you're doing.
{% endhint %}


# l-helper
A super minimalistic syntax sugar library to create DOM elements.

L means _light_. Also, L means _el_ (like in _el_ ement). Library is polymorphic (adds itself to AMD or CommonJS module system, or if fails to find one, just exposes itself into global scope as `L`);

## Example:

```js
L('div', { class: 'task__logs' + (task.status === 'SUCCESS' ? ' task__logs_collapsed' : '') }, [
    L('div', { class: 'task__logs-header', onclick: function() {
        L.toggleClass(this.parentElement, 'task__logs_collapsed');
    } }, [
        'Логи',
        (task.resources || [])
            .filter(resource => resource.type === 'TASK_LOGS')
            .map(resource => L('a', { href: resource.url, target: '_blank' }, resource.file_name)),
        L('div', { class: 'log__time' }, task.duration)
    ]),
    L('div', { class: 'task__logs-content' }, task.log)
])
```

## Methods:

### L(tag, attrs, content)
Returns an `HTMLElement`. `content` can be an HTMLElement, a string, a falsy value (ignored), or an array of those.

### L.setClass(elems, cls)
Adds class `cls` to each of `elems` (or if it is not an array, to elems itself). Doesn't duplicate classes

### L.removeClass(elems, cls)
Adds class `cls` to each of `elems` (or if it is not an array, to elems itself). Doesn't duplicate classes

### L.hasClass(el, cls)
Tests whether an element `el` has class `cls`.

### L.toggleClass(elems, cls)
Independently toggles class `cls` on each of `elems`.

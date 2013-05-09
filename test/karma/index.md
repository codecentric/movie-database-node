<h1>Angular Scenario Cheat Sheet</h1>

<h2 id="api">DSL</h2>

<p>Source: <a href="https://github.com/angular/angular.js/blob/master/src/ngScenario/dsl.js">https://github.com/angular/angular.js/blob/master/src/ngScenario/dsl.js</a></p>

<strong id="pause">pause()</strong>

<p>Pauses the execution of the tests until you call <code>resume()</code> in the console (or click the resume
link in the Runner UI).</p>

<strong id="sleepseconds">sleep(seconds)</strong>

<p>Pauses the execution of the tests for the specified number of <code>seconds</code>.</p>

<strong id="browsernavigatetourl">browser().navigateTo(url)</strong>

<p>Loads the <code>url</code> into the test frame.</p>

<strong id="browsernavigatetourlfn">browser().navigateTo(url, fn)</strong>

<p>Loads the URL returned by <code>fn</code> into the testing frame. The given <code>url</code> is only used for the test
output. Use this when the destination URL is dynamic (that is, the destination is unknown when you
write the test).</p>

<strong id="browserreload">browser().reload()</strong>

<p>Refreshes the currently loaded page in the test frame.</p>

<strong id="browserwindowhref">browser().window().href()</strong>

<p>Returns the window.location.href of the currently loaded page in the test frame.</p>

<strong id="browserwindowpath">browser().window().path()</strong>

<p>Returns the window.location.pathname of the currently loaded page in the test frame.</p>

<strong id="browserwindowsearch">browser().window().search()</strong>

<p>Returns the window.location.search of the currently loaded page in the test frame.</p>

<strong id="browserwindowhash">browser().window().hash()</strong>

<p>Returns the window.location.hash (without <code>#</code>) of the currently loaded page in the test frame.</p>

<strong id="browserlocationurl">browser().location().url()</strong>

<p>Returns the <a href="api/ng.$location"><code>$location.url()</code></a> of the currently loaded page in
the test frame.</p>

<strong id="browserlocationpath">browser().location().path()</strong>

<p>Returns the <a href="api/ng.$location"><code>$location.path()</code></a> of the currently loaded page in
the test frame.</p>

<strong id="browserlocationsearch">browser().location().search()</strong>

<p>Returns the <a href="api/ng.$location"><code>$location.search()</code></a> of the currently loaded page
in the test frame.</p>

<strong id="browserlocationhash">browser().location().hash()</strong>

<p>Returns the <a href="api/ng.$location"><code>$location.hash()</code></a> of the currently loaded page in
the test frame.</p>

<strong id="expectfuturematcher">expect(future).{matcher}</strong>

<p>Asserts the value of the given <code>future</code> satisfies the <code>matcher</code>. All API statements return a
<code>future</code> object, which get a <code>value</code> assigned after they are executed. Matchers are defined using
<code>angular.scenario.matcher</code>, and they use the value of futures to run the expectation. For example:
<code>expect(browser().location().href()).toEqual('http://www.google.com')</code></p>

<strong id="expectfuturenotmatcher">expect(future).not().{matcher}</strong>

<p>Asserts the value of the given <code>future</code> satisfies the negation of the <code>matcher</code>.</p>

<strong id="usingselectorlabel">using(selector, label)</strong>

<p>Scopes the next DSL element selection.</p>

<strong id="bindingname">binding(name)</strong>

<p>Returns the value of the first binding matching the given <code>name</code>.</p>

<strong id="inputnameentervalue">input(name).enter(value)</strong>

<p>Enters the given <code>value</code> in the text field with the given <code>name</code>.</p>

<strong id="inputnamecheck">input(name).check()</strong>

<p>Checks/unchecks the checkbox with the given <code>name</code>.</p>

<strong id="inputnameselectvalue">input(name).select(value)</strong>

<p>Selects the given <code>value</code> in the radio button with the given <code>name</code>.</p>

<strong id="inputnameval">input(name).val()</strong>

<p>Returns the current value of an input field with the given <code>name</code>.</p>

<strong id="repeaterselectorlabelcount">repeater(selector, label).count()</strong>

<p>Returns the number of rows in the repeater matching the given jQuery <code>selector</code>. The <code>label</code> is
used for test output.</p>

<strong id="repeaterselectorlabelrowindex">repeater(selector, label).row(index)</strong>

<p>Returns an array with the bindings in the row at the given <code>index</code> in the repeater matching the
given jQuery <code>selector</code>. The <code>label</code> is used for test output.</p>

<strong id="repeaterselectorlabelcolumnbinding">repeater(selector, label).column(binding)</strong>

<p>Returns an array with the values in the column with the given <code>binding</code> in the repeater matching
the given jQuery <code>selector</code>. The <code>label</code> is used for test output.</p>

<strong id="selectnameoptionvalue">select(name).option(value)</strong>

<p>Picks the option with the given <code>value</code> on the select with the given <code>name</code>.</p>

<strong id="selectnameoptionvalue1value2">select(name).option(value1, value2...)</strong>

<p>Picks the options with the given <code>values</code> on the multi select with the given <code>name</code>.</p>

<strong id="elementselectorlabelcount">element(selector, label).count()</strong>

<p>Returns the number of elements that match the given jQuery <code>selector</code>. The <code>label</code> is used for test
output.</p>

<strong id="elementselectorlabelclick">element(selector, label).click()</strong>

<p>Clicks on the element matching the given jQuery <code>selector</code>. The <code>label</code> is used for test output.</p>

<strong id="elementselectorlabelqueryfn">element(selector, label).query(fn)</strong>

<p>Executes the function <code>fn(selectedElements, done)</code>, where selectedElements are the elements that
match the given jQuery <code>selector</code> and <code>done</code> is a function that is called at the end of the <code>fn</code>
function.  The <code>label</code> is used for test output.</p>

<strong id="elementselectorlabelmethod">element(selector, label).{method}()</strong>

<p>Returns the result of calling <code>method</code> on the element matching the given jQuery <code>selector</code>, where
<code>method</code> can be any of the following jQuery methods: <code>val</code>, <code>text</code>, <code>html</code>, <code>height</code>,
<code>innerHeight</code>, <code>outerHeight</code>, <code>width</code>, <code>innerWidth</code>, <code>outerWidth</code>, <code>position</code>, <code>scrollLeft</code>,
<code>scrollTop</code>, <code>offset</code>. The <code>label</code> is used for test output.</p>

<strong id="elementselectorlabelmethodvalue">element(selector, label).{method}(value)</strong>

<p>Executes the <code>method</code> passing in <code>value</code> on the element matching the given jQuery <code>selector</code>, where
<code>method</code> can be any of the following jQuery methods: <code>val</code>, <code>text</code>, <code>html</code>, <code>height</code>,
<code>innerHeight</code>, <code>outerHeight</code>, <code>width</code>, <code>innerWidth</code>, <code>outerWidth</code>, <code>position</code>, <code>scrollLeft</code>,
<code>scrollTop</code>, <code>offset</code>.  The <code>label</code> is used for test output.</p>

<strong id="elementselectorlabelmethodkey">element(selector, label).{method}(key)</strong>

<p>Returns the result of calling <code>method</code> passing in <code>key</code> on the element matching the given jQuery
<code>selector</code>, where <code>method</code> can be any of the following jQuery methods: <code>attr</code>, <code>prop</code>, <code>css</code>. The
<code>label</code> is used for test output.</p>

<strong id="elementselectorlabelmethodkeyvalue">element(selector, label).{method}(key, value)</strong>

<p>Executes the <code>method</code> passing in <code>key</code> and <code>value</code> on the element matching the given jQuery
<code>selector</code>, where <code>method</code> can be any of the following jQuery methods: <code>attr</code>,  <code>prop</code>, <code>css</code>.  The
<code>label</code> is used for test output.</p>

<p>JavaScript is a dynamically typed language which comes with great power of expression, but it also
come with almost no-help from the compiler. For this reason we feel very strongly that any code
written in JavaScript needs to come with a strong set of tests. We have built many features into
angular which makes testing your angular applications easy. So there is no excuse for not testing.</p></div>

<h2>Matchers</h2>

Source: https://github.com/angular/angular.js/blob/master/src/ngScenario/matchers.js

```
expect(...).toEqual('Foobar');
expect(...).toBe(5);
expect(...).toBeDefined();
expect(...).toBeTruthy();
expect(...).toBeFalsy();
expect(...).toMatch(/^abc$/);
expect(...).toBeNull();
expect(...).toContain(3);
expect(...).toBeLessThan(42);
expect(...).toBeGreaterThan(3);
```
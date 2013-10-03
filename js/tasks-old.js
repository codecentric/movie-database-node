(function() {
  'use strict';

  var sections = [
    {
      selector: '.acceptance-criteria',
      title: 'Acceptance Criteria'
    }, {
      selector: '.hints',
      title: 'Hints'
    }, {
      selector: '.management',
      title: 'Management'
    }
  ];

  function ele(type, content) {
    var e = document.createElement(type);
    if (content) e.textContent = content;
    return e;
  }

  function prepend(to, node) {
    to.insertBefore(node, to.childNodes[0]);
  }

  function toggleClass(e, val, trueClass, falseClass) {
    e.classList.remove(val ? falseClass : trueClass);
    e.classList.add(val ? trueClass : falseClass);
  }

  function addDoneIndicator(task) {
    var id = task.dataset.id;
    if (!id) {
      throw new Error('No ID defined for task!');
    }
    var storageIdentifier = 'task-' + id;

    var status = localStorage.getItem(storageIdentifier) || 'notStarted';

    var managementWrapper = ele('div');
    managementWrapper.classList.add('management');
    task.appendChild(managementWrapper);

    task.children[0];
  }

  var tasks = [].slice.call(document.getElementsByTagName('li'));

  tasks.forEach(function(task) {
    addDoneIndicator(task);
    var sectionElements = sections.map(function(section) {
      var element = task.querySelector(section.selector);
      if (element) {
        prepend(element, ele('h2', section.title));
        element.classList.add('hide');
        return element;
      }

      return null;
    }).filter(function(e) {
      return !!e;
    });;

    if (sectionElements.length === 0) {
      return;
    }

    var visible = false;
    var toggle = ele('a');
    toggle.classList.add('icon-collapse');
    task.children[0].appendChild(toggle);
    toggle.addEventListener('click', function(e) {
      visible = !visible;
      sectionElements.forEach(function(e) {
        toggleClass(e, visible, 'show', 'hide');
        toggleClass(toggle, visible, 'icon-collapse-top', 'icon-collapse');
      });
      e.preventDefault();
    }, false);
  });

})();

export const clickOutside = {
  mounted(el: any, binding: any) {
    const handler = binding.value;
    el.clickOutsideEventHandler = (event: Event) => {
      // check that click was outside the el and his children
      if (!(el == event.target || el.contains(event.target))) {
        handler(event, el); // and if it did, call method provided in attribute value
      }
    };

    // listen on click event
    document.addEventListener('click', el.clickOutsideEventHandler);
  },
  unmounted(el: any) {
    // remove click event listener
    document.removeEventListener('click', el.clickOutsideEventHandler);
  },
};

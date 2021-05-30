import { createEffect, createStore } from 'effector';

const changeStateEditElement = createEffect({
  name: 'change state modal aa',
  handler: (state) => state,
});
const changeStateEditModal = createEffect({
  name: 'change state modal aa',
  handler: (state) => state,
});
const $editElement = createStore('').on(changeStateEditElement.done, (_, { result }) => result);

const $editShow = createStore(false).on(changeStateEditModal.done, (_, { result }) => result);

export { $editElement, changeStateEditElement, $editShow, changeStateEditModal };

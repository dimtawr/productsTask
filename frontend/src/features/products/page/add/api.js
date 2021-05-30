import { createEffect, createStore } from 'effector';

const changeStateAddModal = createEffect({
  name: 'change state modal aa',
  handler: (state) => state,
});
const $addShow = createStore(false).on(changeStateAddModal.done, (_, { result }) => result);

export { $addShow, changeStateAddModal };

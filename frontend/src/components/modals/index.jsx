import AddChannel from './AddChannel';
import RemoveChannel from './RemoveChannel';

const modals = {
  add: AddChannel,
  remove: RemoveChannel,
};

export default (type) => modals[type];

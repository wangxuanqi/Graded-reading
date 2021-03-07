// actions.js
import {CHANGE_NAME} from './actionsTypes';

const changeName = (id, name) => ({type: CHANGE_NAME, id: id, name: name});

export {changeName};

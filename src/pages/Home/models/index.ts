import { invoke_service } from '@/actions';
import fp_filter from 'lodash/fp/filter';
import fp_get from 'lodash/fp/get';

export default {
  state: {
    title: 'Hello',
    select_scense: {

    },
    rules_list: [],

  },
  reducers: {
    update(prevState, payload) {
      return {
        ...prevState,
        ...payload,
      };
    },

  },
  effects: (dispatch) => ({

    async set_select_scense(data) {
      dispatch.model.update({
        select_scense: data,
      });
    },

    async get_rules_by_scense(scense_id) {
      try {
        const res = await invoke_service.get_all_rules_list();
        const data = res?.data;
        dispatch.model.update({
          rules_list: data,
        });
      } catch (e) {
        console.error(e);
      }
    },

  }),
};

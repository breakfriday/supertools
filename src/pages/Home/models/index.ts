import { invoke_service } from '@/actions';
import fp_filter from 'lodash/fp/filter';
import fp_get from 'lodash/fp/get';

export default {
  state: {
    title: 'Hello',
    select_scense: {

    },
    rules_list: [],
    select_proxy_type: '',

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

    async get_rules_by_scense(parm = {}) {
      try {
        const res = await invoke_service.get_all_rules_list(parm);
        const data = res?.data;
        dispatch.model.update({
          rules_list: data,
        });
      } catch (e) {
        console.error(e);
      }
    },

    set_proxy_type(type) {
      dispatch.model.update({
        select_proxy_type: type,
      });
    },

  }),
};

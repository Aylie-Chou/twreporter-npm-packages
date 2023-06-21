import types from '../constants/action-types'

// import { MEMBER_ROLE } from '@twreporter/core/lib/constants/member-role'

// lodash
import get from 'lodash/get'
import merge from 'lodash/merge'

const _ = {
  get,
  merge,
}

const initState = {
  error: null,
  isFetching: false,
  isReady: false,
  // TODO: need add other user state after connect to getUser api
  // userID: -1,
  // firstName: '',
  // lastName: '',
  // role: MEMBER_ROLE.explorer,
  // email: '',
  // activated: false,
  readPreference: [],
  maillist: [],
}

export default function user(state = initState, action) {
  const { payload } = action
  switch (action.type) {
    case types.user.update.request: {
      return _.merge({}, state, {
        isFetching: true,
        isReady: false,
      })
    }

    case types.user.update.success: {
      const readPreference = _.get(payload, 'data.record.read_preference', [])
      const maillist = _.get(payload, 'data.record.maillist', [])
      state.readPreference = readPreference
      state.maillist = maillist
      return {
        ...state,
        error: null,
        isFetching: false,
        isReady: true,
        maillist,
        readPreference,
      }
    }

    case types.user.update.failure: {
      return {
        ...state,
        error: payload.error,
        isFetching: false,
        isReady: false,
      }
    }

    default:
      return state
  }
}

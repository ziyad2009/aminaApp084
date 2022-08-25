callNativeSyncHook(
    moduleID: number,
    methodID: number,
    params: mixed[],
    onFail: ?(...mixed[]) => void,
    onSucc: ?(...mixed[]) => void,
  ): mixed {
    if (__DEV__) {
      invariant(
        global.nativeCallSyncHook,
        'Calling synchronous methods on native ' +
          'modules is not supported in Chrome.\n\n Consider providing alternative ' +
          'methods to expose this method in debug mode, e.g. by exposing constants ' +
          'ahead-of-time.',
      );
    }
    this.processCallbacks(moduleID, methodID, params, onFail, onSucc);
    return global.nativeCallSyncHook(moduleID, methodID, params);
  }
  in  reac-native /library/messageQuize
  https://stackoverflow.com/questions/61067004/invariant-violation-calling-synchronous-methods-on-native-modules-is-not-suppor


  api5 map AIzaSyAdbHnuniJzD0g6XrQnPV9qbjT_WxZ7jcs
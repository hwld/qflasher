import { KeyboardEvent } from "react";

/**
 *
 * eventがIME入力中に発生したか
 */
export const isIME = (event: KeyboardEvent) => {
  // macでIME確定キーがEnterとしてハンドリングされてしまうため、IME入力中のkeyDownを無視する
  // 非推奨のkeyCodeつかってるけど、MDNにもこう書いてるから仕方なく・・・
  // https://developer.mozilla.org/ja/docs/Web/API/Document/keydown_event
  return event.nativeEvent.isComposing || event.keyCode === 229;
};

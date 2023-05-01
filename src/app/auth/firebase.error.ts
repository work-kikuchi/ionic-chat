export const firebaseError = {
  'auth/invalid-email': {
    code: 'メールアドレスの間違い',
    message: 'メールアドレスのフォーマットが間違っています',
  },
  'auth/wrong-password': {
    code: 'パスワードの間違い',
    message: '入力したパスワードが違います(^^)',
  },
  'auth/weak-password': {
    code: '脆弱性があります',
    message: 'パスワードが弱いです',
  },
  'auth/user-not-found': {
    code: 'ユーザーが見つかりません',
    message: 'ユーザーはいません',
  },
  'auth/email-already-in-use': {
    code: 'ユーザーが存在しています',
    message: '既に存在してます',
  },
};

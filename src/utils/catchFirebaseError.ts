import type { FirebaseError } from 'firebase/app';

export const catchFirebaseError = (err: FirebaseError) => {
  switch (err.code) {
    case 'auth/cancelled-popup-request':
    case 'auth/popup-closed-by-user':
      return '';
    case 'auth/email-already-in-use':
      return 'このメールアドレスは使用されています';
    case 'auth/invalid-email':
      return 'メールアドレスの形式が正しくありません';
    case 'auth/user-disabled':
      return 'サービスの利用が停止されています';
    case 'auth/user-not-found':
      return 'メールアドレスまたはパスワードが違います';
    case 'auth/user-mismatch':
      return 'メールアドレスまたはパスワードが違います';
    case 'auth/weak-password':
      return 'パスワードは6文字以上にしてください';
    case 'auth/wrong-password':
      return 'メールアドレスまたはパスワードが違います';
    case 'auth/popup-blocked':
      return '認証ポップアップがブロックされました。ポップアップブロックをご利用の場合は設定を解除してください';
    case 'auth/operation-not-supported-in-this-environment':
    case 'auth/auth-domain-config-required':
    case 'auth/operation-not-allowed':
    case 'auth/unauthorized-domain':
      return '現在この認証方法はご利用頂けません';
    case 'auth/requires-recent-login':
      return '認証の有効期限が切れています';
    default:
      return 'エラーが発生しました。しばらく時間をおいてお試しください';
  }
};

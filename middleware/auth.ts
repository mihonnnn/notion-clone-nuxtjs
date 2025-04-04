import { useAuth } from "~/composables/useAuth";

//以下の配列にパスが入っているページはログインしてなくても閲覧できる
const publicPaths = ["/login", "/register", "/welcome"];

export default defineNuxtRouteMiddleware(async (to, from) => {
  const { user, loading } = useAuth();

  // ユーザー状態が読み込まれるまで待機
  if (loading.value) {
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  // パブリックパスの場合は誰でもアクセス可能
  if (publicPaths.includes(to.path)) {
    // ログイン済みでパブリックパスの場合は、ログインやレジスターページならホームにリダイレクト
    if (user.value && (to.path === "/login" || to.path === "/register")) {
      return navigateTo("/", { redirectCode: 302 });
    }
    return; // それ以外のパブリックパスはそのまま表示
  }

  // ここに来るのは保護されたルート（publicPathsに含まれないすべてのルート）
  // ログインしていなければログインページへリダイレクト
  if (!user.value) {
    return navigateTo("/login", { redirectCode: 401 });
  }
});

//Classe para navegar pelas páginas carregando apenas conteúdo html
// NavigationService.ts
import { Routes } from "../routes/Routes";

class NavigationService {
  static navigateTo(route: string, navigate: (path: string) => void) {
    navigate(route);
  }

  static navigateLogin(navigate: (path: string) => void) {
    this.navigateTo(Routes.LOGIN, navigate);
  }

  static navigateCadastro(navigate: (path: string) => void) {
    this.navigateTo(Routes.CADASTRO, navigate);
  }

  static navigateHome(navigate: (path: string) => void) {
    this.navigateTo(Routes.HOME, navigate);
  }

  static navigateProfile(navigate: (path: string) => void) {
    this.navigateTo(Routes.PERFIL, navigate);
  }

  static navigateDashboard(navigate: (path: string) => void) {
    this.navigateTo(Routes.DASHBOARD, navigate);
  }
}

export default NavigationService;

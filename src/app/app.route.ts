import { AuthGuard } from "./auth.guard";
import { LoginComponent } from "./login/login.component";
import { ProductComponent } from "./product/product.component";
import { RecentComponent } from "./recent/recent.component";

export const routes: any = [
    { path: '', redirectTo: '/crawl', pathMatch: 'full' }, // Redirect to home by default
    { path: 'login', component: LoginComponent },
    { path: 'crawl', component: ProductComponent, canActivate: [AuthGuard] },
    { path: 'recent', component: RecentComponent, canActivate: [AuthGuard] }
]
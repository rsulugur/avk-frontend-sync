import { LoginComponent } from "./login/login.component";
import { AuditComponent } from "./audit/audit.component";
import { HomeComponent } from "./home/home.component";
import { AuthGuard } from "./auth/auth.guard";

export const routes: any = [
    { path: '', redirectTo: '/avk', pathMatch: 'full' },
    {
        path: 'avk',
        children: [
            { path: '', redirectTo: 'crawl', pathMatch: 'full' },
            { path: 'crawl', component: HomeComponent, canActivate: [AuthGuard] },
            { path: 'audit', component: AuditComponent, canActivate: [AuthGuard] }
        ]
    },
    { path: 'login', component: LoginComponent }
]


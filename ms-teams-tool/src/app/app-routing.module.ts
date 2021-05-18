import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { MsalGuard } from '@azure/msal-angular';
import { DetailComponent } from './detail/detail.component';
import { FailedComponent } from './failed/failed.component';
import { MyChannelsComponent } from './my-channels/my-channels.component';
import { CreateChannelComponent } from './create-channel/create-channel.component';
import { ViewMembersComponent } from './view-members/view-members.component';
import { AddMemberComponent } from './add-member/add-member.component';

const routes: Routes = [
  {
    path: 'create-channels',
    component: CreateChannelComponent,
    canActivate: [MsalGuard]
  },
  {
    path: 'lazyLoad',
    loadChildren: () => import('./lazy/lazy.module').then(m => m.LazyModule),
    canLoad: [MsalGuard]
  },
  {
    // Needed for hash routing
    path: 'code',
    component: HomeComponent
  },
  {
    path: 'login-failed',
    component: FailedComponent
  },
  {
    path: 'channels',
    component: MyChannelsComponent,
    canActivate: [MsalGuard]
  },
  {
    path: 'channels/members',
    component: ViewMembersComponent,
    canActivate: [MsalGuard]
  },
  {
    path: 'channels/members/add',
    component: AddMemberComponent,
    canActivate: [MsalGuard]
  }
];

const isIframe = window !== window.parent && !window.opener; // Remove this line to use Angular Universal

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true,
    // Don't perform initial navigation in iframes
    initialNavigation: !isIframe ? 'enabled' : 'disabled' // Remove this line to use Angular Universal
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

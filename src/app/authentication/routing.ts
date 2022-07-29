import { CoreModule } from "../core/core.module"

{
    path: 'user',
        canActivateChild: [AdminAuthGuard],
            component: CoreComponent
    children: [
        { path: '', pathMatch: 'full', component: CoreComponent },
        {
            path: 'notes',
            children: [
                {
                    path: '',
                    children:[
                        {path: '', pathMatch: 'full', component: NotesCompoment},
                        {path:'{notes-id||name}}', component: NoteDetailsComponent}
                    ]




                },
            ],
        },
        {path:'user-details', component: userDetailComponent}

    ]
},



  ///corecomopment ma
 // Nav bar <router-outlet></router-outlet>
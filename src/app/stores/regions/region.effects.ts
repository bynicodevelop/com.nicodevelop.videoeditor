import { Injectable } from '@angular/core';

@Injectable()
export class RegionEffects {
  // constructor(private actions$: Actions, private store$: Store<State>) {}
  // updateRegion$ = createEffect(
  //   () => {
  //     return this.actions$.pipe(
  //       ofType(updateRegion),
  //       map((action) => {
  //         console.log(action);
  //         console.log(
  //           this.store$
  //             .pipe(
  //               select((state) => state),
  //               map((state) => state)
  //             )
  //             .subscribe((state) => console.log(state.entities))
  //         );
  //         return action;
  //       })
  //     );
  //   },
  //   { dispatch: false }
  // );
}

#React Native Router Flux Animated Lightbox
___

Often, I needed custom animations for modals with transparent backgrounds with React Native Router Flux V4. 

This is how I solved for this.

##How it works
This uses an fork of `ReactTransitionGroup` to animate things when views are entering and exiting. This component makes up `BaseModal` and takes a child with the custom animations on it. You can pass it an `AnimationView` prop which will let you use a custom Animation instead of the `BaseModalAnimationView`.

`CustomAnimationView` is an animated component that scales up on mount and transitions down after complete.

To get the TransitionOut to trigger, you have to remove the component from the View before calling `Actions.pop`. I added this to `BaseModal` and you can trigger it with `this.refs.modal.pop()`. If you pass a different `outDuration` to the `BaseModal`, it will automatically adjust the setTimeout for calling `Actions.pop`
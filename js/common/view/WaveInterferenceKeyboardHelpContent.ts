// Copyright 2026, University of Colorado Boulder

/**
 * WaveInterferenceKeyboardHelpContent is the content for the keyboard-help dialog, shared by the wave-interference and
 * waves-intro simulations. Screens with draggable tools (measuring tape, stopwatch, wave meter) pass
 * includeToolControls: true to add the toolbox and movement sections; the Diffraction screen passes false. The Slits
 * screen additionally passes includeComboBoxContent: true, since it's the only screen with a combo box (the barrier
 * type selector).
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import optionize from '../../../../phet-core/js/optionize.js';
import BasicActionsKeyboardHelpSection from '../../../../scenery-phet/js/keyboard/help/BasicActionsKeyboardHelpSection.js';
import ComboBoxKeyboardHelpSection from '../../../../scenery-phet/js/keyboard/help/ComboBoxKeyboardHelpSection.js';
import KeyboardHelpSection from '../../../../scenery-phet/js/keyboard/help/KeyboardHelpSection.js';
import MoveDraggableItemsKeyboardHelpSection from '../../../../scenery-phet/js/keyboard/help/MoveDraggableItemsKeyboardHelpSection.js';
import SliderControlsKeyboardHelpSection from '../../../../scenery-phet/js/keyboard/help/SliderControlsKeyboardHelpSection.js';
import TwoColumnKeyboardHelpContent from '../../../../scenery-phet/js/keyboard/help/TwoColumnKeyboardHelpContent.js';
import WaveInterferenceStrings from '../../WaveInterferenceStrings.js';
import ToolboxToolsKeyboardHelpSection from './ToolboxToolsKeyboardHelpSection.js';

type SelfOptions = {

  // Whether to document the toolbox tools (measuring tape, stopwatch, wave meter) and their keyboard dragging. True for
  // the Waves/Interference/Slits screens, false for the Diffraction screen, which has no such tools.
  includeToolControls?: boolean;

  // Whether to document the barrier-type combo box. True only for the Slits screen.
  includeComboBoxContent?: boolean;
};

export default class WaveInterferenceKeyboardHelpContent extends TwoColumnKeyboardHelpContent {

  public constructor( providedOptions?: SelfOptions ) {

    const options = optionize<SelfOptions>()( {
      includeToolControls: true,
      includeComboBoxContent: false
    }, providedOptions );

    const sliderSection = new SliderControlsKeyboardHelpSection();

    // Checkboxes only appear on the screens that also have draggable tools (Waves/Interference/Slits); Diffraction has
    // neither.
    const basicActionsSection = new BasicActionsKeyboardHelpSection( {
      withCheckboxContent: options.includeToolControls
    } );

    const leftSections: KeyboardHelpSection[] = [];
    const rightSections: KeyboardHelpSection[] = [];

    if ( options.includeToolControls ) {

      // Left column sections. Slider Controls is grouped here (rather than with Basic Actions) to balance the total
      // row count between the two columns, matching the pattern used in beers-law-lab's BeersLawKeyboardHelpContent.
      const toolsSection = new ToolboxToolsKeyboardHelpSection();
      const moveDraggableItemsSection = new MoveDraggableItemsKeyboardHelpSection();

      // Vertically align the icons of the stacked left-column sections.
      KeyboardHelpSection.alignHelpSectionIcons( [ toolsSection, moveDraggableItemsSection, sliderSection ] );

      leftSections.push( toolsSection, moveDraggableItemsSection, sliderSection );

      // Right column sections. The combo box (Slits only) is documented alongside Basic Actions, also matching
      // beers-law-lab's pattern.
      if ( options.includeComboBoxContent ) {
        rightSections.push( new ComboBoxKeyboardHelpSection( {
          headingString: WaveInterferenceStrings.keyboardHelpDialog.chooseABarrierTypeStringProperty,
          thingAsLowerCaseSingular: WaveInterferenceStrings.keyboardHelpDialog.barrierTypeStringProperty,
          thingAsLowerCasePlural: WaveInterferenceStrings.keyboardHelpDialog.barrierTypesStringProperty
        } ) );
      }
      rightSections.push( basicActionsSection );
    }
    else {

      // The Diffraction screen has no draggable tools; show slider and basic actions only.
      leftSections.push( sliderSection );
      rightSections.push( basicActionsSection );
    }

    super( leftSections, rightSections, {
      isDisposable: false
    } );
  }
}

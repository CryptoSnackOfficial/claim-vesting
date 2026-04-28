# Design System Document

## 1. Overview & Creative North Star

### Creative North Star: "The Secure Luminary"
This design system moves away from the sterile, rigid grids of traditional finance and toward an "Editorial Fintech" experience. It treats the SNACK vesting contract not just as a tool, but as a premium asset management suite. By leveraging high-contrast typography, deep tonal layering, and vibrant kinetic gradients, we create an environment that feels both technologically advanced and rock-solid secure.

The visual language breaks the "template" look through:
*   **Intentional Asymmetry:** Strategic use of whitespace and off-center focal points (like the signature gradient waves) to guide the eye.
*   **Tonal Depth:** Replacing harsh lines with shifts in background luminance to create a sense of physical space.
*   **Vibrant Authority:** Using the high-energy Pink-to-Orange gradient as a precision tool for primary actions against a sea of deep, trustworthy Navy.

## 2. Colors

The color palette is anchored in deep midnight tones to evoke stability, accented by neon-leaning highlights that signal modern web3 innovation.

### Surface Hierarchy & Nesting
To achieve a high-end feel, we follow a strict **"No-Line" Rule**. Designers are prohibited from using 1px solid borders for sectioning. Boundaries must be defined through background color shifts.

*   **Core Background:** `surface` (#05132b) is the foundation of the entire viewport.
*   **Sectioning:** Use `surface_container_low` (#0e1b33) for large layout blocks.
*   **Interactive Cards:** Use `surface_container` (#121f38) or `surface_container_high` (#1d2a43) to lift actionable content.
*   **Nesting:** A `surface_container_highest` (#28354e) element should only live inside a lower-tier container, creating a "stacked glass" effect.

### The Glass & Gradient Rule
Floating elements (such as modals or hovering navigation) should utilize a **Glassmorphism** effect:
*   **Background:** `surface_variant` (#28354e) at 60% opacity.
*   **Backdrop Filter:** blur(20px).
*   **Signature Textures:** Main CTAs and hero headers must use a linear gradient: `primary_container` (#e9005f) to `secondary_container` (#fd8b00) at a 135-degree angle. This provides a "soul" to the interface that flat colors cannot replicate.

## 3. Typography

The typography strategy pairs the technical precision of **Plus Jakarta Sans** with the approachable readability of **Manrope**.

*   **Display & Headline (Plus Jakarta Sans):** Used for large balance amounts and section titles. The high x-height and geometric forms convey modern authority.
*   **Title & Body (Manrope):** Used for functional text and descriptors. Manrope's slightly rounded terminals complement the SNACK brand's friendly nature while remaining highly legible for financial data.
*   **Labels (Inter):** Reserved for micro-data, such as wallet addresses and "Coming Soon" badges.

**Scale Highlight:**
*   **Display-LG:** 3.5rem (Use for primary SNACK balances).
*   **Headline-SM:** 1.5rem (Use for card titles like "Vesting Schedule").
*   **Label-MD:** 0.75rem (Use for status indicators and metadata).

## 4. Elevation & Depth

We reject traditional box-shadows in favor of **Tonal Layering**.

### The Layering Principle
Depth is achieved by "stacking" the surface-container tiers. For example, a "Claim" card should be `surface_container_highest` sitting on a `surface_container_low` dashboard area. This creates a soft, natural lift.

### Ambient Shadows
If an element must float (e.g., a dropdown):
*   **Blur:** 40px to 60px.
*   **Opacity:** 8%.
*   **Color:** Use a tinted version of `on_surface` (#d8e2ff) rather than pure black to mimic natural light dispersion within the navy environment.

### The Ghost Border
If a boundary is absolutely required for accessibility:
*   **Token:** `outline_variant` (#5c3f43).
*   **Opacity:** Strictly 10-20%.
*   **Constraint:** Never use 100% opaque borders.

## 5. Components

### Buttons
*   **Primary:** Rounded `full` (9999px). Background: Gradient (Pink to Orange). Text: `on_primary_container` (#ffffff).
*   **Secondary:** Rounded `full`. Background: `surface_bright` (#2d3953). Text: `on_surface` (#d8e2ff).
*   **States:** On hover, primary buttons should increase in saturation; secondary buttons should shift to `surface_container_highest`.

### Cards & Containers
*   **Rounding:** Use `lg` (2rem) for main dashboard cards. Use `md` (1.5rem) for internal nested elements.
*   **Padding:** Always use `8` (2rem) or `10` (2.5rem) to ensure "breathing room" that feels premium.
*   **Separation:** Forbid divider lines. Use vertical white space `6` (1.5rem) or subtle background shifts.

### Input Fields
*   **Style:** Minimalist. Background: `surface_container_lowest`.
*   **Focus State:** A "Ghost Border" of `primary` (#ffb2be) at 40% opacity and a subtle outer glow using the primary color.

### Vesting-Specific Components
*   **Vesting Progress Bar:** A thick (12px) track using `surface_container_highest` with a `primary_container` to `secondary_container` gradient fill.
*   **Security Alerts:** High-contrast `error_container` (#93000a) backgrounds with `on_error_container` (#ffdad6) text, using the `sm` (0.5rem) rounding scale to feel more urgent and "alert-like" compared to the soft-rounded UI.

## 6. Do's and Don'ts

### Do
*   **Do** use asymmetrical layouts where the right side of the screen feels "lighter" than the left.
*   **Do** apply the signature gradient to meaningful actions only (Claim, Stake, Connect).
*   **Do** use `letter-spacing: -0.02em` on Display and Headline types to create a tighter, editorial feel.
*   **Do** utilize the `rounded-full` style for "Coming Soon" or "Live" status chips.

### Don't
*   **Don't** use 1px solid white or grey borders. This immediately flattens the UI and breaks the premium feel.
*   **Don't** use pure black (#000000) for shadows; always tint them with the background navy.
*   **Don't** overcrowd the interface. If two elements feel too close, skip a level in the Spacing Scale (e.g., move from `4` to `6`).
*   **Don't** use the vibrant pink for body text; keep it reserved for headings, buttons, and iconography to maintain its impact.
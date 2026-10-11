# Source register

Every explanation has its primary URL, exact quote locator, version information, and limits in `content/`. Brief quoted text and third-party images retain their authors' rights. No license for this site's code grants rights to third-party sources.

| Explanation | Primary source | Original figure |
| --- | --- | --- |
| AgentDojo | [arXiv:2406.13352v3](https://arxiv.org/pdf/2406.13352v3), Debenedetti et al., revision 24 November 2024 | Figure 1, PDF p.2, cropped without altering figure content. Single attributed excerpt for explanatory commentary; original copyright retained. arXiv's distribution license does not establish a general open reuse license. |
| CaMeL | [arXiv:2503.18813v2](https://arxiv.org/pdf/2503.18813v2), Debenedetti et al., revision 24 June 2025 | Figure 11, PDF p.16, cropped; [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). Attribution and crop disclosure appear with the figure. |
| Normalization of deviance | [Embrace The Red](https://embracethered.com/blog/posts/2025/the-normalization-of-deviance-in-ai/), wunderwuzzi, 4 December 2025 | [Original monitor illustration](https://embracethered.com/blog/images/2025/normalization-of-deviance-in-ai.png). Credited selected excerpt accompanying commentary; rights retained by original author. |
| Lethal trifecta | [Simon Willison's Weblog](https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/), 16 June 2025 | [Original diagram](https://static.simonwillison.net/static/2025/lethaltrifecta.jpg); PNG conversion with identical decoded pixels. Credit: Simon Willison; original rights retained. |
| Financial statements | [SEC guide](https://www.sec.gov/about/reports-publications/investorpubsbegfinstmtguide), 4 February 2007 | No relevant original figure exists. The linked financial-statement visual is an original researchx hypothetical example. |

AgentDojo chart values all come from Table 5, PDF p.20, including reported 95% confidence intervals. Utility under attack requires correct user-task completion without adversarial side effects (§3.4, p.6). Table 3's baseline is a different experiment and is not mixed into this chart. CaMeL's o3 task-completion result and Figure 11's Claude attack experiment are explicitly separated.

The reading-dial interaction takes visual inspiration from [Transition Dial](https://animation-gallery-xi.vercel.app/). Its implementation is written for this repository; no source code or external package was copied from the reference. The overall restrained approach draws inspiration from `pm/finx` and editorial article sites.

Motion behavior also draws on Kinetics by **ckissi / Colorion** ([gallery](https://kinetics.colorion.co/), [repository](https://github.com/ckissi/kinetics)), packaged reference commit `017498f8ae0e728ce7461852070d22601dd0a46e`. The Momentum Picker and Bookmark Toggle behaviors were independently adapted to this vanilla JavaScript site; no upstream source bundle is distributed. Physical gesture response, velocity handoff, interruption, typography and accessible alternatives follow the local Apple Design skill. See `kinetics-adaptations.json` for verification scope.

import { styled } from "@linaria/react";
import { useEffect, useState } from "react";
import { Swiper } from "swiper";
import { Drawer } from "vaul";

import instructions1 from "@/assets/images/instructions-1.png";
import instructions2 from "@/assets/images/instructions-2.png";
import instructions3 from "@/assets/images/instructions-3.png";
import Button from "@/components/button";
import Text from "@/components/text";
import { border, borderRadius, colors, type } from "@/styles/core";
import { Row, Center } from "@/styles/layout";

const DragHandle = styled.div`
  width: 125px;
  height: 9px;
  margin-bottom: 24px;
  border: ${border.thinWhite};
  border-radius: ${borderRadius.round};
`;

const TitleRow = styled(Row)`
  margin-bottom: 24px;
`;

const Title = styled(Drawer.Title)`
  ${type.headline2}
`;

const getBackgroundImage = (image: string) => `url(${image})`;
const InstructionsImage = styled.div<{ image: string }>`
  height: 200px;
  margin: 0 32px 24px;
  background: ${(props) => getBackgroundImage(props.image)} no-repeat center;
  background-size: contain;
`;

const Instruction = styled.div`
  ${type.body}
  margin: 0 12px;
  text-align: center;
`;

const NextButtonContainer = styled.div`
  padding-top: 12px;
`;

function InstructionsCarousel({
  slide,
  onSlideChange,
}: {
  slide: number;
  onSlideChange: (index: number) => void;
}) {
  const [swiper, setSwiper] = useState<Swiper | null>(null);

  useEffect(() => {
    const swiper = new Swiper(".swiper");
    swiper.on("slideChange", () => onSlideChange(swiper.activeIndex));
    setSwiper(swiper);

    return () => {
      swiper?.destroy();
    };
  }, [onSlideChange]);

  useEffect(() => {
    swiper?.slideTo(slide);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slide]);

  return (
    <div className="swiper">
      <div className="swiper-wrapper">
        <div className="swiper-slide" data-vaul-no-drag>
          <InstructionsImage image={instructions1} data-vaul-no-drag />
          <Instruction data-vaul-no-drag>
            Add tiles to the grid by tapping on an empty space.
          </Instruction>
        </div>
        <div className="swiper-slide" data-vaul-no-drag>
          <InstructionsImage image={instructions2} data-vaul-no-drag />
          <Instruction data-vaul-no-drag>
            Tap tiles to spell words. You can go any direction and even change
            directions. Diagonals are not allowed.
          </Instruction>
        </div>
        <div className="swiper-slide" data-vaul-no-drag>
          <InstructionsImage image={instructions3} data-vaul-no-drag />
          <Instruction data-vaul-no-drag>
            Once you spell a word, the tiles will disappear. You get a bonus for
            spelling longer words, so try to make the most of your tiles!
          </Instruction>
        </div>
      </div>
    </div>
  );
}

const DrawerContent = styled(Drawer.Content)`
  position: fixed;
  bottom: 0;
  left: max(calc(50% - 250px), 0px);
  width: 100%;
  max-width: 500px;
  padding: 16px 24px max(env(safe-area-inset-bottom), 12px);
  color: ${colors.white};
  background: ${colors.black};
  border-radius: ${borderRadius.medium} ${borderRadius.medium} 0 0;

  :focus {
    outline: none;
  }
`;

const drawerOverlayColor = `${colors.black}A0`;
const DrawerOverlay = styled(Drawer.Overlay)`
  position: fixed;
  background: ${drawerOverlayColor};
  inset: 0;
`;

function BottomDrawer() {
  const [open, setOpen] = useState(false);
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    setSlide(0);
  }, [open]);

  return (
    <Drawer.Root shouldScaleBackground open={open} onOpenChange={setOpen}>
      <Drawer.Trigger aria-label="Instructions">
        <Button icon small>
          ?
        </Button>
      </Drawer.Trigger>
      <Drawer.Portal>
        <DrawerOverlay />

        <DrawerContent>
          <Center>
            <DragHandle />
          </Center>
          <TitleRow>
            <Title>How to Woggle</Title>
            <Text style="overline">{slide + 1} / 3</Text>
          </TitleRow>

          <InstructionsCarousel slide={slide} onSlideChange={setSlide} />

          <NextButtonContainer>
            {slide === 2 ? (
              <Button fullWidth onClick={() => setOpen(false)}>
                Done
              </Button>
            ) : (
              <Button fullWidth onClick={() => setSlide(slide + 1)}>
                Next
              </Button>
            )}
          </NextButtonContainer>
        </DrawerContent>
      </Drawer.Portal>
    </Drawer.Root>
  );
}

export default BottomDrawer;

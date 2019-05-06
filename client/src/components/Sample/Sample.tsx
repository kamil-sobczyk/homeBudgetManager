import * as React from "react";
import { observable } from "mobx";
import { observer } from "mobx-react";
import styled from "styled-components";
import { Button } from "rmwc/Button";
import { Typography } from "rmwc/Typography";
import { AppData } from "../../lib/App/AppData";

interface HomePageProps {
  appData: AppData;
}

@observer
export class Sample extends React.Component<HomePageProps, {}> {
  @observable showParagraph: boolean = false;

  toggleParagraph = () => {
    this.showParagraph = !this.showParagraph;
  };

  render() {
    return (
      <SampleContainer>
        <StyledButton onClick={this.toggleParagraph} outlined>
          {this.showParagraph ? "hide" : "show"}
        </StyledButton>
        {this.showParagraph && (
          <TextContainer>
            <TextBlock use="subtitle1" tag="p">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
              scelerisque arcu dolor, at pellentesque lectus pretium in.
              Suspendisse nec consequat magna. Quisque at ipsum tristique,
              dignissim lacus quis, ultrices tellus. Quisque et lacus mollis,
              dignissim magna porta, convallis nibh. Aenean accumsan placerat
              augue sit amet iaculis. Phasellus luctus lectus ut tortor
              fringilla vestibulum sed nec tortor. Vestibulum vulputate volutpat
              ante. Morbi eleifend convallis quam sit amet molestie. Maecenas
              sit amet libero pretium, venenatis quam non, auctor massa.
            </TextBlock>
            <TextBlock use="body2" tag="p">
              Quisque congue nunc sit amet arcu aliquet euismod. Phasellus
              ultricies ante in turpis maximus semper. Lorem ipsum dolor sit
              amet, consectetur adipiscing elit. Praesent rutrum, arcu nec
              feugiat molestie, mauris ante vulputate tellus, at efficitur sem
              mauris nec ex. In quis nunc vel nunc rutrum condimentum in id
              lectus. Sed sagittis eget tellus ac mattis. Aliquam eu consectetur
              lectus. In dictum sem id dui dignissim bibendum. Morbi ac
              convallis libero. Nam imperdiet mi eu eleifend volutpat. Mauris
              maximus nibh nec finibus condimentum. Curabitur imperdiet, eros at
              malesuada tincidunt, erat massa porta metus, non posuere dolor
              neque nec justo.
            </TextBlock>
            <TextBlock use="body2" tag="p">
              Cras malesuada massa at ex pellentesque placerat. Aenean id
              suscipit orci. Vivamus at magna sem. Vivamus fermentum, lorem non
              pharetra iaculis, dui elit suscipit dolor, id sagittis lectus
              velit porttitor leo. Etiam enim velit, ornare at tincidunt at,
              maximus quis lorem. Praesent nec eros tempor, imperdiet risus vel,
              dapibus augue. Vivamus sed rhoncus magna. Mauris pharetra commodo
              justo. Sed feugiat vestibulum dui bibendum efficitur. Maecenas
              mollis gravida varius. Vestibulum sollicitudin ante ac tortor
              vehicula rhoncus. In feugiat fringilla fermentum. Sed sit amet
              orci vitae mi eleifend blandit. Aliquam ut magna augue. Aenean
              tincidunt magna mi, eleifend lacinia metus scelerisque in. Class
              aptent taciti sociosqu ad litora torquent per conubia nostra, per
              inceptos himenaeos.
            </TextBlock>
            <TextBlock use="body2" tag="p">
              Pellentesque at odio pellentesque, egestas dolor eget, faucibus
              ex. Aenean viverra gravida dolor vel porta. Sed vitae ipsum mi.
              Vestibulum a lacus commodo, tincidunt augue in, pharetra purus.
              Duis leo dolor, elementum in arcu a, pharetra cursus orci.
              Curabitur eu euismod neque. Aenean purus sem, volutpat nec
              sollicitudin id, finibus vel justo. Vivamus condimentum efficitur
              neque sit amet fermentum. Proin varius, dui finibus consequat
              ultricies, augue libero sodales nisi, eget tempor nulla est et
              neque. Phasellus sodales mi tortor, et convallis leo volutpat vel.
              Donec est purus, facilisis nec tempor ac, pellentesque a enim.
              Etiam cursus in ante et sollicitudin. Ut commodo quam eget eros
              vehicula dictum.
            </TextBlock>
            <TextBlock use="body2" tag="p">
              Integer quis sapien in urna commodo dignissim. Integer tortor
              lacus, congue ut massa non, lacinia consequat libero. Donec
              condimentum libero elit, eu iaculis nisi lobortis ac. Praesent
              arcu ex, hendrerit ut vestibulum ut, tempus eget ligula. Maecenas
              scelerisque erat auctor, volutpat lacus a, pulvinar lorem. Aenean
              eget risus ornare, aliquet urna tempus, sodales tortor. Aliquam
              erat volutpat. Duis quis erat nec urna blandit sollicitudin. Donec
              eu rutrum elit. Nullam tempor, magna a fermentum tempor, urna urna
              pellentesque ipsum, nec mattis mauris eros placerat elit.
            </TextBlock>
          </TextContainer>
        )}
      </SampleContainer>
    );
  }
}

const SampleContainer = styled.div`
  min-height: 100%;
  min-width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledButton = styled(Button)`
  min-width: 120px;
`;

const TextContainer = styled.div`
  margin: 20px 60px;
  max-width: 800px;
`;

const TextBlock = styled(Typography)`
  text-align: justify;
`;

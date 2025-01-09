import { Icon, Image } from "@appkit/dek-ui";
import { Container } from "./CoverArt.styled";
import noop from "../../../lib/utils/noop";

type Props = {
  url: string;
  showLargeContent: boolean;
  onClick?: () => void;
};

const CoverArt = ({ url, showLargeContent, onClick = noop }: Props) => {
  const size = showLargeContent ? "60vh" : "250px";

  return (
    <Container
      aria-label="media-cover-art"
      $large={showLargeContent}
      onClick={onClick}
    >
      <Image
        src={url}
        width={size}
        height={size}
        style={{ borderRadius: 4 }}
        fallbackElement={
          <Icon
            name="IoMusicalNotes"
            size={150}
            color="#ffffff22"
            style={{ marginLeft: -20 }}
          />
        }
      />
    </Container>
  );
};

export default CoverArt;

import React from "react";
import "./index.less";

import { LeftSquare } from "@icon-park/react";

interface IBackHeaderProps {
  onBack: () => void;
  title: string;
}

const BackHeader = ({ onBack, title }: IBackHeaderProps): JSX.Element => {
  return (
    <div className="back-header-container">
      <LeftSquare className="back-logo" theme="outline" size="20" fill="#333" onClick={onBack} />
      <div className="back-title">{title}</div>
    </div>
  );
};

export default BackHeader;

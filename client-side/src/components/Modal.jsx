const Modal = ({ hideModal, render, children }) => {
  return (
    <div
      onClick={hideModal}
      id="background"
      className="fixed flex items-center justify-center top-0 left-0 w-full h-full bg-black bg-opacity-60 z-[9997]"
    >
      <div className="h-[75%] w-[33.333%] rounded-md p-5 bg-white bg-opacity-100 flex">
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
};

export default Modal;

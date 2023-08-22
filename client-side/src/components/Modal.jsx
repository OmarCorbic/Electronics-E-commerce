const Modal = ({ hideModal, children }) => {
  return (
    <div
      onClick={hideModal}
      id="background"
      className="fixed left-0 top-0 z-[9997] flex h-full w-full items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm"
    >
      <div className=" flex w-[25rem] rounded-md bg-white bg-opacity-100 p-5 text-sm lg:min-h-[80%] lg:w-[30rem]">
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
};

export default Modal;

interface BotonProps {
  label: String;
  onClick: (id: number) => void;
}

const clickBoton = (props: BotonProps) => {
  console.log(`Renderizando botón: ${props.label}`);
  props.onClick(58);
};

const nuevasBotonProps: BotonProps = {
  label: "Borrar usuario",
  onClick: (id: number) => {
    console.log(`Borrando usuario ${id}`);
  },
};

clickBoton(nuevasBotonProps);

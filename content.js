// Escucha los mensajes enviados por la extensión
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "fillForm") {
    fillForm();
  }
});

// Función para rellenar el formulario automáticamente
function fillForm() {
  // Rellenar campos de entrada
  const inputMappings = {
    "nro_documento|DNI": "12345678",
    "name|nombre": "John Doe",
    "surname|apellido": "Smith",
    "email|correo": "john.doe@example.com",
    "phone|telefono|tel": "123-456-7890",
    "address|direccion": "123 Main St",
    "city|ciudad": "Anytown",
    "zip|postal|codigo": "12345",
    "state|estado": "CA",
    "country|pais": "USA",
  };

  document.querySelectorAll("input").forEach((input) => {
    if (
      input.type === "file" ||
      input.type === "submit" ||
      input.type === "reset" ||
      input.type === "hidden"
    ) {
      return;
    }

    const attributes = [
      input.name,
      input.id,
      input.placeholder,
      input.className,
    ]
      .join(" ")
      .toLowerCase();

    for (const attribute in inputMappings) {
      if (new RegExp(attribute).test(attributes)) {
        input.value = inputMappings[attribute];
        return;
      }
    }

    switch (input.type) {
      case "text":
        input.value = "Texto de ejemplo";
        break;
      case "email":
        input.value = "ejemplo@correo.com";
        break;
      case "password":
        input.value = "123456";
        break;
      case "tel":
        input.value = "123-456-7890";
        break;
      case "url":
        input.value = "http://ejemplo.com";
        break;
      case "number":
        input.value = 123;
        break;
      case "date":
        input.value = new Date().toISOString().split("T")[0];
        break;
      case "checkbox":
        input.checked = true;
        break;
      case "radio":
        input.checked = true;
        break;
      default:
        input.value = "Datos de ejemplo";
    }
  });

  // Rellenar campos de texto
  document.querySelectorAll("textarea").forEach((textarea) => {
    textarea.value =
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
  });

  // Rellenar campos de selección
  document.querySelectorAll("select").forEach((select) => {
    if (select.options.length > 0) {
      select.selectedIndex = 1; // Selecciona la segunda opción
    }
  });
}

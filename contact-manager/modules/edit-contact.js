export const render = (contact) => {
  const editContactContainer = document.createElement('form');
  editContactContainer.classList.add('edit-contact');

  const { name, surname, id, email, phone } = contact;

  editContactContainer.innerHTML = `
    <h4 class="mb-2">
      Editing contact ${name} ${surname} (id: ${id})
    </h4>
    <label class="form-label mb-2" for="name">
      name
    </label>
    <input type='text' id="name" name="name" class="form-control form-control-sm" value="${name}">

    <label class="form-label mb-2" for="surname">
      surname
    </label>
    <input type='text' id="surname" name="surname" class="form-control form-control-sm" value="${surname}">

    <label class="form-label mb-2" for="email">
      email
    </label>
    <input type='text' id="email" name="email" class="form-control form-control-sm" value="${email}">

    <label class="form-label mb-2" for="phone">
      phone
    </label>
    <input type='text' id="phone" name="phone" class="form-control form-control-sm" value="${phone}">

    <input type="hidden" name="id" value="${id}">

    <div class="mt-2">
    <button type="submit" class="btn btn-primary">Save</button>
    <button type="button" class="cancel-edit-contact btn btn-secondary">Cancel</button>
    </div>
  `;

  return editContactContainer;
};

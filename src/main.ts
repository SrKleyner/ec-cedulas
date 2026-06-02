function generarCedula(): string {
  const provincia = Math.floor(Math.random() * 24) + 1
  const provinciaStr = provincia.toString().padStart(2, '0')
  const secuencial = Math.floor(Math.random() * 10000000).toString().padStart(7, '0')
  const base = provinciaStr + secuencial

  let suma = 0
  for (let i = 0; i < 9; i++) {
    let digito = parseInt(base[i], 10)
    if (i % 2 === 0) {
      digito *= 2
      if (digito >= 10) digito -= 9
    }
    suma += digito
  }

  const residuo = suma % 10
  const digitoVerificador = residuo === 0 ? 0 : 10 - residuo

  return base + digitoVerificador
}

function copiarAlPortapapeles(texto: string, btn: HTMLElement) {
  navigator.clipboard.writeText(texto)
  const original = btn.innerHTML
  btn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`
  btn.classList.add('copiado')
  setTimeout(() => {
    btn.innerHTML = original
    btn.classList.remove('copiado')
  }, 1500)
}

const copyIcon = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>`

function mostrarCedulas() {
  const tbody = document.getElementById('cedula-body')!
  tbody.innerHTML = ''
  for (let i = 0; i < 10; i++) {
    const cedula = generarCedula()
    const tr = document.createElement('tr')

    const tdIndex = document.createElement('td')
    tdIndex.className = 'col-index'
    tdIndex.textContent = String(i + 1).padStart(2, '0')

    const tdCedula = document.createElement('td')
    tdCedula.className = 'col-cedula'
    tdCedula.textContent = cedula

    const tdCopy = document.createElement('td')
    tdCopy.className = 'col-copy'
    const copyBtn = document.createElement('button')
    copyBtn.className = 'copy-btn'
    copyBtn.innerHTML = copyIcon
    copyBtn.setAttribute('aria-label', 'Copiar cédula')
    copyBtn.addEventListener('click', () => copiarAlPortapapeles(cedula, copyBtn))
    tdCopy.appendChild(copyBtn)

    tr.appendChild(tdIndex)
    tr.appendChild(tdCedula)
    tr.appendChild(tdCopy)
    tbody.appendChild(tr)
  }
}

document.getElementById('generate-btn')!.addEventListener('click', mostrarCedulas)
mostrarCedulas()

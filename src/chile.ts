function generarRut(): string {
  const numero = Math.floor(Math.random() * 90_000_000) + 10_000_000
  const digitos = numero.toString().split('').map(Number)

  const factores = [2, 3, 4, 5, 6, 7]
  let suma = 0
  let factorIdx = 0
  for (let i = digitos.length - 1; i >= 0; i--) {
    suma += digitos[i] * factores[factorIdx % 6]
    factorIdx++
  }

  const resto = suma % 11
  const dvCalc = 11 - resto

  let dv: string
  if (dvCalc === 11) {
    dv = '0'
  } else if (dvCalc === 10) {
    dv = 'K'
  } else {
    dv = dvCalc.toString()
  }

  return `${numero}${dv}`
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

function mostrarRuts() {
  const tbody = document.getElementById('rut-body')!
  tbody.innerHTML = ''
  for (let i = 0; i < 10; i++) {
    const rut = generarRut()
    const tr = document.createElement('tr')

    const tdIndex = document.createElement('td')
    tdIndex.className = 'col-index'
    tdIndex.textContent = String(i + 1).padStart(2, '0')

    const tdRut = document.createElement('td')
    tdRut.className = 'col-rut'
    tdRut.textContent = rut

    const tdCopy = document.createElement('td')
    tdCopy.className = 'col-copy'
    const copyBtn = document.createElement('button')
    copyBtn.className = 'copy-btn'
    copyBtn.innerHTML = copyIcon
    copyBtn.setAttribute('aria-label', 'Copiar RUT')
    copyBtn.addEventListener('click', () => copiarAlPortapapeles(rut, copyBtn))
    tdCopy.appendChild(copyBtn)

    tr.appendChild(tdIndex)
    tr.appendChild(tdRut)
    tr.appendChild(tdCopy)
    tbody.appendChild(tr)
  }
}

document.getElementById('generate-btn')!.addEventListener('click', mostrarRuts)
mostrarRuts()

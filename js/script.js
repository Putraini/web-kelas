var TxtType = function(el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = '';
  this.tick();
  this.isDeleting = false;
};

TxtType.prototype.tick = function() {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
  this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
  this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

  var that = this;
  var delta = 200 - Math.random() * 100;

  if (this.isDeleting) { delta /= 2; }

  if (!this.isDeleting && this.txt === fullTxt) {
  delta = this.period;
  this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
  this.isDeleting = false;
  this.loopNum++;
  delta = 500;
  }

  setTimeout(function() {
  that.tick();
  }, delta);
};

window.onload = function() {
  var elements = document.getElementsByClassName('typewrite');
  for (var i=0; i<elements.length; i++) {
      var toRotate = elements[i].getAttribute('data-type');
      var period = elements[i].getAttribute('data-period');
      if (toRotate) {
        new TxtType(elements[i], JSON.parse(toRotate), period);
      }
  }
  // INJECT CSS
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
  document.body.appendChild(css);
};

document.addEventListener('DOMContentLoaded', function() {
  // Navbar toggle for small screens
  const navbarToggle = document.querySelector('.navbar-toggle');
  const navbarLinks = document.querySelector('.navbar-links');

  navbarToggle.addEventListener('click', function() {
    navbarLinks.classList.toggle('active');
    navbarToggle.classList.toggle('active');
  });

  // Header scroll animation
  const header = document.querySelector('header');
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Intersection Observer for fade-in effect
  const observerOptions = {
    threshold: 0.1
  };

  const fadeInObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.gallery-item').forEach(item => {
    fadeInObserver.observe(item);
  });

  // Function to show student image in the gallery
  const galleryItems = document.querySelectorAll('.gallery-item');
  const studentImages = document.querySelectorAll('.student-image');

  function showStudentImage(element, imageName, studentName) {
    // Remove any previously shown student images
    studentImages.forEach(img => img.remove());

    // Create new image element
    const imageElement = document.createElement('img');
    imageElement.src = imageName;
    imageElement.alt = studentName;
    imageElement.classList.add('student-image');

    // Append image to the container
    element.querySelector('.gallery-item-info').appendChild(imageElement);
  }

  // Event listeners for student list items
  document.querySelectorAll('.student-list li').forEach(student => {
    student.addEventListener('click', function() {
      const imageName = this.getAttribute('data-image');
      const studentName = this.querySelector('.student-name').textContent;
      showStudentImage(this, imageName, studentName);
    });
  });
});
//   js daftar hadir
document.addEventListener('DOMContentLoaded', function() {
  const monthSelect = document.getElementById('monthSelect');
  const yearSelect = document.getElementById('yearSelect');
  const applyFilterBtn = document.getElementById('applyFilterBtn');
  const attendanceContainer = document.getElementById('attendanceContainer');

  // Data dummy untuk kehadiran siswa (ganti dengan data yang sesuai dengan kebutuhan Anda)
  const attendanceData = [
      { name: 'Putra', daysPresent: 30, daysAbsent: 0, daysSick: 0, daysPermission: 0 },
      { name: 'Nabila', daysPresent: 30, daysAbsent: 0, daysSick: 0, daysPermission: 0 },
      { name: 'Izza', daysPresent: 18, daysAbsent: 6, daysSick: 0, daysPermission: 0 },
      { name: 'Keiysa', daysPresent: 22, daysAbsent: 3, daysSick: 1, daysPermission: 1 },
      { name: 'Shinta', daysPresent: 20, daysAbsent: 4, daysSick: 0, daysPermission: 0 },
      { name: 'Komang', daysPresent: 18, daysAbsent: 6, daysSick: 0, daysPermission: 0 },
      { name: 'Dewi', daysPresent: 22, daysAbsent: 3, daysSick: 1, daysPermission: 1 },
      { name: 'Luna', daysPresent: 20, daysAbsent: 4, daysSick: 0, daysPermission: 0 },
      { name: 'Marsha', daysPresent: 18, daysAbsent: 6, daysSick: 0, daysPermission: 0 },
      { name: 'Reta', daysPresent: 22, daysAbsent: 3, daysSick: 1, daysPermission: 1 },
      { name: 'Mila', daysPresent: 20, daysAbsent: 4, daysSick: 0, daysPermission: 0 },
      { name: 'Bagas', daysPresent: 18, daysAbsent: 6, daysSick: 0, daysPermission: 0 },
      { name: 'Bayu A.', daysPresent: 22, daysAbsent: 3, daysSick: 1, daysPermission: 1 },
      { name: 'Bayu E.', daysPresent: 20, daysAbsent: 4, daysSick: 0, daysPermission: 0 },
      { name: 'Reno', daysPresent: 18, daysAbsent: 6, daysSick: 0, daysPermission: 0 },
      { name: 'Radho', daysPresent: 22, daysAbsent: 3, daysSick: 1, daysPermission: 1 },
      { name: 'Alfin', daysPresent: 20, daysAbsent: 4, daysSick: 0, daysPermission: 0 },
      { name: 'Bagus', daysPresent: 18, daysAbsent: 6, daysSick: 0, daysPermission: 0 },
      { name: 'Nabil M.', daysPresent: 18, daysAbsent: 6, daysSick: 0, daysPermission: 0 },
      { name: 'Reza', daysPresent: 18, daysAbsent: 6, daysSick: 0, daysPermission: 0 },
      { name: 'Ebi', daysPresent: 18, daysAbsent: 6, daysSick: 0, daysPermission: 0 },
      { name: 'Rozi', daysPresent: 18, daysAbsent: 6, daysSick: 0, daysPermission: 0 },
      { name: 'Rohman', daysPresent: 18, daysAbsent: 6, daysSick: 0, daysPermission: 0 },
      { name: 'Afin', daysPresent: 18, daysAbsent: 6, daysSick: 0, daysPermission: 0 },
      { name: 'Bayu P.', daysPresent: 18, daysAbsent: 6, daysSick: 0, daysPermission: 0 },
      { name: 'Hasyir', daysPresent: 18, daysAbsent: 6, daysSick: 0, daysPermission: 0 },
      { name: 'Nabil Z.', daysPresent: 18, daysAbsent: 6, daysSick: 0, daysPermission: 0 },
      { name: 'Naufal', daysPresent: 18, daysAbsent: 6, daysSick: 0, daysPermission: 0 },
      { name: 'Nabil I.', daysPresent: 18, daysAbsent: 6, daysSick: 0, daysPermission: 0 },
      { name: 'Nella', daysPresent: 18, daysAbsent: 6, daysSick: 0, daysPermission: 0 },
      { name: 'Nia Rossa', daysPresent: 18, daysAbsent: 6, daysSick: 0, daysPermission: 0 },
      { name: 'Nuril', daysPresent: 18, daysAbsent: 6, daysSick: 0, daysPermission: 0 },
      { name: 'Olivia', daysPresent: 18, daysAbsent: 6, daysSick: 0, daysPermission: 0 },
      { name: 'Osamah', daysPresent: 18, daysAbsent: 6, daysSick: 0, daysPermission: 0 },
      { name: 'Radit', daysPresent: 18, daysAbsent: 6, daysSick: 0, daysPermission: 0 },
      // Tambahkan data lainnya sesuai kebutuhan
  ];

  // Function untuk merender data kehadiran
  function renderAttendance(data) {
      attendanceContainer.innerHTML = ''; // Bersihkan konten sebelum menambahkan data baru

      // Animasi fade-in saat menambahkan item
      data.forEach(student => {
          const studentItem = document.createElement('div');
          studentItem.classList.add('attendance-item', 'fade-in');
          studentItem.innerHTML = `
              <h3>${student.name}</h3>
              <p>Hadir: ${student.daysPresent} hari</p>
              <p>Alpa: ${student.daysAbsent} hari</p>
              <p>Sakit: ${student.daysSick} hari</p>
              <p>Izin: ${student.daysPermission} hari</p>
          `;
          attendanceContainer.appendChild(studentItem);
      });
  }

  // Event listener untuk tombol filter
  applyFilterBtn.addEventListener('click', function() {
      const selectedMonth = parseInt(monthSelect.value);
      const selectedYear = parseInt(yearSelect.value);

      // Filter data berdasarkan bulan dan tahun yang dipilih (dummy function, sesuaikan dengan logika Anda)
      const filteredData = attendanceData.filter(student => {
          return true; // Ganti dengan logika filter yang sesuai dengan data Anda
      });

      // Tampilkan data yang difilter
      renderAttendance(filteredData);
  });

  // Render data saat halaman dimuat
  renderAttendance(attendanceData);
});

//   js daftar hadir end
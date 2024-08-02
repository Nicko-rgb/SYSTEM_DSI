import "./publicacion.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaHeart, FaPlus, FaUser } from "react-icons/fa";
import { TiMessages } from "react-icons/ti";
import { SlOptionsVertical } from "react-icons/sl";
import { CiCircleInfo } from "react-icons/ci";
import { IoIosCloseCircleOutline } from "react-icons/io";
import texto from "../../IMG/texto.png";

import Navegador from "../Navegador/Navegador";
import Cabeza from "../Navegador/Cabeza";
import Comentarios from "./Comentarios";
import UploadForm from "./SubirNuevo";
import EstadoSesion from "../Formularios/Sesion";

<<<<<<< HEAD
// Componente Modal mejorado
const Modal = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>{title}</h2>
        {children}
        <button className="modal-close" onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
=======
const Publicaciones = () => {
    //verificar si el usuario inicio sesion
    const { userName, isLoggedIn } = EstadoSesion()
    const [publicaciones, setPublicaciones] = useState([]);
    const [comment, setComment] = useState('');


    // Agrega un estado local para cada publicación
    const [showComments, setShowComments] = useState({});
    const [likes, setLikes] = useState({});
    const [showUploadForm, setShowUploadForm] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const handleComments = (id) => {
        setShowComments((prevShowComments) => ({
            ...prevShowComments,
            [id]: !prevShowComments[id]
        }));
    };
    const mostrarSubirPublic = () => {
        setShowUploadForm(true);
    };
    const cerrarSubirPublic = () => {
        setShowUploadForm(false);
    };
    const handleImageClick = (image) => {
        setSelectedImage(image);
        setShowModal(true);
    };
    const closeModal = () => {
        setShowModal(false);
        setSelectedImage(null);
    };

    //obtener las publicaciones
    useEffect(() => {
        const fechPublicacion = async () => {
            try {
                const dataPublicacion = await fetch("https://backend-systemblog-production.up.railway.app/api/publicaciones")
                const publicaciones = await dataPublicacion.json()
                setPublicaciones(publicaciones)

                // Inicializa los estados locales para cada publicación
                setShowComments(publicaciones.reduce((acc, pub) => ({ ...acc, [pub._id]: false }), {}));
                setLikes(publicaciones.reduce((acc, pub) => ({ ...acc, [pub._id]: false }), {}));
            } catch (error) {
                console.log(error)
            }
        };
        fechPublicacion();
    }, []);
    //codigo para enviar comentarios de cada publicacion
    const handleCommentSubmit = async (publicacionId) => {
        try {
            // Enviar el comentario al servidor
            await fetch(`https://backend-systemblog-production.up.railway.app/api/publicaciones/${publicacionId}/comentar`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    usuario: userName,
                    texto: comment,
                }),
            });

            // Limpiar el campo de comentario
            setComment('');

            // Opcionalmente, actualizar el estado local con la publicación actualizada
            const response = await fetch(`https://backend-systemblog-production.up.railway.app/api/publicaciones/${publicacionId}`);
            const updatedPublicacion = await response.json();
            setPublicaciones((prevPublicaciones) =>
                prevPublicaciones.map((pub) =>
                    pub._id === publicacionId ? updatedPublicacion : pub
                )
            );
        } catch (error) {
            console.error('Error al enviar comentario:', error);
        }
    };

    //codigo de los likes de cada publicacion para obtener y enviar
    useEffect(() => {
        // Cargar los likes del usuario al iniciar el componente
        const fetchLikes = async () => {
            try {
                const response = await axios.get(`https://backend-systemblog-production.up.railway.app/api/likes/${userName}`);
                setLikes(response.data.reduce((acc, like) => {
                    acc[like.publicacionId] = true;
                    return acc;
                }, {}));
            } catch (error) {
                console.error('Error al cargar los likes:', error);
            }
        };
        fetchLikes();
    }, [userName]);

    //obtener lo likes de cada uno
    const handleLike = async (publicacionId) => {
        try {
            // Verificar si el usuario ya ha dado like a la publicación
            if (likes[publicacionId]) {
                return;
            }

            // Enviar la acción de like al servidor
            await axios.post(`https://backend-systemblog-production.up.railway.app/api/publicaciones/${publicacionId}/like`, {
                userName: userName,
            });

            // Actualizar el estado local de likes
            setLikes((prevLikes) => ({ ...prevLikes, [publicacionId]: true }));

            // Actualizar el estado local de la publicación
            setPublicaciones((prevPublicaciones) =>
                prevPublicaciones.map((pub) =>
                    pub._id === publicacionId
                        ? { ...pub, likes: pub.likes + 1 }
                        : pub
                )
            );
        } catch (error) {
            console.error('Error al dar like:', error);
        }
    };

    //formatear menos 5 horas
    const moment = require('moment-timezone'); // Asegúrate de que moment-timezone esté instalado

    const formatDate = (dateString) => {
        return moment.utc(dateString).local().format('DD/MM/YYYY');
    };

    const formatTime = (timeString) => {
        return moment.utc(timeString, 'HH:mm:ss').local().format('HH:mm');
    };

    return (
        <div className="publicaciones">
            <Cabeza />
            <Navegador />
            <main className="subPubli">
                {!isLoggedIn && (
                    <div className="noLogueado">
                        <p> <CiCircleInfo className='noLogIco' /> Para subir publicaciones debes iniciar sesión</p>
                        <button onClick={() => window.location.href = "/login"}>INICIA SESION</button>
                    </div>
                )}
                {isLoggedIn && (
                    <div className="subirNuevo">
                        <img src={texto} alt="" />
                        <div onClick={mostrarSubirPublic}>
                            <input type="text" placeholder='Escribe Aquí' />
                            <FaPlus className='iconPlus' />
                        </div>
                    </div>
                )}
                {showUploadForm && (
                    <UploadForm cerrarSubir={cerrarSubirPublic} />
                )}

                {[...publicaciones].reverse().map((datos) => (
                    <div className="content-publicacion" key={datos._id}>
                        <header>
                            <FaUser className="fa fa-user"></FaUser>
                            <div className="datoUser">
                                <h3>{datos.userName} </h3>
                                <div>
                                    <p>{formatDate(datos.createdAtDate)} </p>
                                    <p>{formatTime(datos.createdAtTime)} </p>
                                </div>
                            </div>
                            <SlOptionsVertical className='ico-publiAction' />
                            <div className='accionPubli'>
                                <p>Denuncia</p>
                                <p>Ver la Publicacion</p>
                                <p>Informacion</p>
                                <p>Borrar Publicacion</p>
                            </div>
                        </header>

                        {datos.image || datos.video ? (
                            <div className="publicArchivo">
                                <p className='descrip'> {datos.textArchivo} </p>
                                {datos.image && (
                                    <div className="fotoPublicacion" onClick={() => handleImageClick(datos.image)}>
                                        <img src={`https://backend-systemblog-production.up.railway.app/uploads/${datos.image.filename}`} alt='imagenPublic' />
                                    </div>
                                )}
                                {datos.video && (
                                    <div className="videoPublicacion">
                                        <video controls>
                                            <source src={`https://backend-systemblog-production.up.railway.app/uploads/${datos.video.filename}`} type={datos.video.contentType} />
                                        </video>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="soloTextoPublic">
                                <h4 style={{ whiteSpace: 'pre-wrap' }}>{datos.text}</h4>
                            </div>
                        )}

                        <footer>
                            <div className={`divGusta ${likes[datos._id] ? 'liked' : ''}`} onClick={() => handleLike(datos._id)}>
                                <FaHeart className={`ico meGusta ${likes[datos._id] ? 'liked' : ''}`} />
                                <p style={{ color: 'white' }}>{datos.likes}</p>
                            </div>

                            <div className={`divComentar ${showComments[datos._id] ? 'show-comments' : ''}`} onClick={() => handleComments(datos._id)}>
                                <TiMessages className='ico comentar' />
                                <p>{datos.comentarios.length} </p>
                            </div>
                        </footer>

                        {
                            showComments[datos._id] && (
                                <Comentarios className={`comments ${showComments[datos._id] ? 'show-comments' : ''}`} comentarios={datos.comentarios} />
                            )
                        }

                        <div style={{ position: 'relative' }} className='formComent'>
                            <form onSubmit={(e) => {
                                e.preventDefault();
                                handleCommentSubmit(datos._id);
                            }}>
                                <input
                                    type="text"
                                    placeholder="Comentar aquí ..."
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                />
                                <button type="submit">COMENTAR</button>
                            </form>
                        </div>
                    </div>
                ))}
            </main>
            {showModal && (
                <div className="modal">
                    <IoIosCloseCircleOutline className='close-button' onClick={closeModal}/>
                    <img src={`https://backend-systemblog-production.up.railway.app/uploads/${selectedImage.filename}`} alt="Imagen ampliada" />
                </div>
            )}
        </div>
    );
>>>>>>> f3fa9a4752759e2a9a694d08f49ca80f208335d0
};

const Publicaciones = () => {
  // Estado para manejar la sesión del usuario
  const { userName, isLoggedIn } = EstadoSesion();

  // Estados para manejar las publicaciones y sus interacciones
  const [publicaciones, setPublicaciones] = useState([]);
  const [comment, setComment] = useState("");
  const [modalAbierto, setModalAbierto] = useState({ tipo: null, id: null });
  const [showComments, setShowComments] = useState({});
  const [likes, setLikes] = useState({});
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [motivo, setMotivo] = useState("");

  // Función para mostrar/ocultar comentarios
  const handleComments = (id) => {
    setShowComments((prevShowComments) => ({
      ...prevShowComments,
      [id]: !prevShowComments[id],
    }));
  };

  // Funciones para manejar el formulario de subir publicación
  const mostrarSubirPublic = () => {
    setShowUploadForm(true);
  };
  const cerrarSubirPublic = () => {
    setShowUploadForm(false);
  };

  // Función para manejar el clic en una imagen
  const handleImageClick = (image) => {
    setSelectedImage(image);
    setShowModal(true);
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setShowModal(false);
    setSelectedImage(null);
  };

  // Efecto para obtener las publicaciones al cargar el componente
  useEffect(() => {
    const fetchPublicaciones = async () => {
      try {
        const response = await axios.get(
          "https://backend-systemblog-production.up.railway.app/api/publicaciones"
        );
        setPublicaciones(response.data);

        // Inicializar estados locales para comentarios y likes
        setShowComments(
          response.data.reduce((acc, pub) => ({ ...acc, [pub._id]: false }), {})
        );
        setLikes(
          response.data.reduce((acc, pub) => ({ ...acc, [pub._id]: false }), {})
        );
      } catch (error) {
        console.error("Error al obtener publicaciones:", error);
      }
    };
    fetchPublicaciones();
  }, []);

  // Función para manejar el envío de comentarios
  const handleCommentSubmit = async (publicacionId) => {
    try {
      await axios.post(
        `https://backend-systemblog-production.up.railway.app/api/publicaciones/${publicacionId}/comentar`,
        {
          usuario: userName,
          texto: comment,
        }
      );
      setComment("");

      // Actualizar la publicación en el estado local
      const updatedPublicacion = await axios.get(
        `https://backend-systemblog-production.up.railway.app/api/publicaciones/${publicacionId}`
      );
      setPublicaciones((prevPublicaciones) =>
        prevPublicaciones.map((pub) =>
          pub._id === publicacionId ? updatedPublicacion.data : pub
        )
      );
    } catch (error) {
      console.error("Error al enviar comentario:", error);
    }
  };
  const handleDenuncia = async (id) => {
    try {
      await axios.post(
        `https://backend-systemblog-production.up.railway.app/api/publicaciones/${id}/denuncia`,
        {
          motivo: motivo,
          denunciante: userName,
        }
      );
      setModalAbierto({ tipo: "denunciaExitosa", id: null });
    } catch (error) {
      console.error("Error al enviar denuncia:", error);
      setModalAbierto({ tipo: "denunciaFallida", id: null });
    }
  };

  const handleVerPublicacion = (id) => {
    const publicacion = publicaciones.find((pub) => pub._id === id);
    setSelectedImage(publicacion.image);
    setModalAbierto({ tipo: "verPublicacion", id });
  };

  const handleInformacion = (id) => {
    const publicacion = publicaciones.find((pub) => pub._id === id);
    setModalAbierto({ tipo: "informacion", id });
  };

  const handleBorrarPublicacion = async (id) => {
    setModalAbierto({ tipo: "confirmarBorrado", id });
  };

  const confirmarBorrado = async (id) => {
    try {
      await axios.delete(
        `https://backend-systemblog-production.up.railway.app/api/publicaciones/${id}`
      );
      setPublicaciones(publicaciones.filter((pub) => pub._id !== id));
      setModalAbierto({ tipo: "borradoExitoso", id: null });
    } catch (error) {
      console.error("Error al borrar publicación:", error);
      setModalAbierto({ tipo: "borradoFallido", id: null });
    }
  };

  // Efecto para cargar los likes del usuario
  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const response = await axios.get(
          `https://backend-systemblog-production.up.railway.app/api/likes/${userName}`
        );
        setLikes(
          response.data.reduce((acc, like) => {
            acc[like.publicacionId] = true;
            return acc;
          }, {})
        );
      } catch (error) {
        console.error("Error al cargar los likes:", error);
      }
    };
    fetchLikes();
  }, [userName]);

  
  // Función para manejar likes
  const handleLike = async (publicacionId) => {
    try {
      if (likes[publicacionId]) return;

      await axios.post(
        `https://backend-systemblog-production.up.railway.app/api/publicaciones/${publicacionId}/like`,
        { userName: userName }
      );

      setLikes((prevLikes) => ({ ...prevLikes, [publicacionId]: true }));
      setPublicaciones((prevPublicaciones) =>
        prevPublicaciones.map((pub) =>
          pub._id === publicacionId ? { ...pub, likes: pub.likes + 1 } : pub
        )
      );
    } catch (error) {
      console.error("Error al dar like:", error);
    }
  };

  // Funciones para formatear fecha y hora
  const moment = require("moment-timezone");
  const formatDate = (dateString) => {
    return moment.utc(dateString).local().format("DD/MM/YYYY");
  };
  const formatTime = (timeString) => {
    return moment.utc(timeString, "HH:mm:ss").local().format("HH:mm");
  };

  // Renderizado del componente
  return (
    <div className="publicaciones">
      <Cabeza />
      <Navegador />
      <main className="subPubli">
        {/* Mensaje para usuarios no logueados */}
        {!isLoggedIn && (
          <div className="noLogueado">
            <p>
              <CiCircleInfo className="noLogIco" /> Para subir publicaciones
              debes iniciar sesión
            </p>
            <button onClick={() => (window.location.href = "/login")}>
              INICIA SESION
            </button>
          </div>
        )}

        {/* Formulario para subir nueva publicación */}
        {isLoggedIn && (
          <div className="subirNuevo">
            <img src={texto} alt="" />
            <div onClick={mostrarSubirPublic}>
              <input type="text" placeholder="Escribe Aquí" />
              <FaPlus className="iconPlus" />
            </div>
          </div>
        )}
        {showUploadForm && <UploadForm cerrarSubir={cerrarSubirPublic} />}

        {/* Listado de publicaciones */}
        {[...publicaciones].reverse().map((datos) => (
          <div className="content-publicacion" key={datos._id}>
            {/* Cabecera de la publicación */}
            <header>
              <FaUser className="fa fa-user"></FaUser>
              <div className="datoUser">
                <h3>{datos.userName}</h3>
                <div>
                  <p>{formatDate(datos.createdAtDate)}</p>
                  <p>{formatTime(datos.createdAtTime)}</p>
                </div>
              </div>
              <SlOptionsVertical className="ico-publiAction" />
              {/* Menú de acciones */}
              <div className="accionPubli">
                <p
                  className="accion-item"
                  onClick={() =>
                    setModalAbierto({ tipo: "denuncia", id: datos._id })
                  }
                >
                  🚨 Denuncia
                </p>
                <p
                  className="accion-item"
                  onClick={() => handleVerPublicacion(datos._id)}
                >
                  👁️ Ver la Publicación
                </p>
                <p
                  className="accion-item"
                  onClick={() => handleInformacion(datos._id)}
                >
                  ℹ️ Información
                </p>
                <p
                  className="accion-item"
                  onClick={() => handleBorrarPublicacion(datos._id)}
                >
                  🗑️ Borrar Publicación
                </p>
              </div>
            </header>

            {/* Contenido de la publicación */}
            {datos.image || datos.video ? (
              <div className="publicArchivo">
                <p className="descrip">{datos.textArchivo}</p>
                {datos.image && (
                  <div
                    className="fotoPublicacion"
                    onClick={() => handleImageClick(datos.image)}
                  >
                    <img
                      src={`https://backend-systemblog-production.up.railway.app/uploads/${datos.image.filename}`}
                      alt="imagenPublic"
                    />
                  </div>
                )}
                {datos.video && (
                  <div className="videoPublicacion">
                    <video controls>
                      <source
                        src={`https://backend-systemblog-production.up.railway.app/uploads/${datos.video.filename}`}
                        type={datos.video.contentType}
                      />
                    </video>
                  </div>
                )}
              </div>
            ) : (
              <div className="soloTextoPublic">
                <h4 style={{ whiteSpace: "pre-wrap" }}>{datos.text}</h4>
              </div>
            )}

            {/* Pie de la publicación (likes y comentarios) */}
            <footer>
              <div
                className={`divGusta ${likes[datos._id] ? "liked" : ""}`}
                onClick={() => handleLike(datos._id)}
              >
                <FaHeart
                  className={`ico meGusta ${likes[datos._id] ? "liked" : ""}`}
                />
                <p style={{ color: "white" }}>{datos.likes}</p>
              </div>

              <div
                className={`divComentar ${
                  showComments[datos._id] ? "show-comments" : ""
                }`}
                onClick={() => handleComments(datos._id)}
              >
                <TiMessages className="ico comentar" />
                <p>{datos.comentarios.length}</p>
              </div>
            </footer>

            {/* Sección de comentarios */}
            {showComments[datos._id] && (
              <Comentarios
                className={`comments ${
                  showComments[datos._id] ? "show-comments" : ""
                }`}
                comentarios={datos.comentarios}
              />
            )}

            {/* Formulario para añadir comentario */}
            <div style={{ position: "relative" }} className="formComent">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleCommentSubmit(datos._id);
                }}
              >
                <input
                  type="text"
                  placeholder="Comentar aquí ..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <button type="submit">COMENTAR</button>
              </form>
            </div>
          </div>
        ))}
      </main>

      {/* Modal para ver imagen ampliada */}
      {showModal && (
        <div className="modal">
          <IoIosCloseCircleOutline
            className="close-button"
            onClick={closeModal}
          />
          <img
            src={`https://backend-systemblog-production.up.railway.app/uploads/${selectedImage.filename}`}
            alt="Imagen ampliada"
          />
        </div>
      )}

      {/* Modal para denuncia */}
      <Modal
        isOpen={modalAbierto.tipo === "denuncia"}
        onClose={() => setModalAbierto({ tipo: null, id: null })}
      >
        <h2>Denuncia</h2>
        <textarea
          value={motivo}
          onChange={(e) => setMotivo(e.target.value)}
          placeholder="Describe el motivo de la denuncia"
        />
        <button onClick={() => handleDenuncia(modalAbierto.id)}>
          Enviar Denuncia
        </button>
      </Modal>

      {/* Modal para ver publicación */}
      <Modal
        isOpen={modalAbierto.tipo === "verPublicacion"}
        onClose={() => setModalAbierto({ tipo: null, id: null })}
      >
        <h2>Ver Publicación</h2>
        {selectedImage && (
          <img
          src={`https://backend-systemblog-production.up.railway.app/uploads/${selectedImage.filename}`}
            alt="Imagen de la publicación"
            style={{ maxWidth: "100%", maxHeight: "80vh" }}
          />
        )}
      </Modal>

      {/* Modal para información */}
      <Modal
        isOpen={modalAbierto.tipo === "informacion"}
        onClose={() => setModalAbierto({ tipo: null, id: null })}
      >
        {modalAbierto.id && (
          <div>
            <h2>Información de la Publicación</h2>
            <p>Usuario: {publicaciones.find(pub => pub._id === modalAbierto.id).userName}</p>
            <p>Fecha: {formatDate(publicaciones.find(pub => pub._id === modalAbierto.id).createdAtDate)}</p>
            <p>Hora: {formatTime(publicaciones.find(pub => pub._id === modalAbierto.id).createdAtTime)}</p>
            <p>Likes: {publicaciones.find(pub => pub._id === modalAbierto.id).likes}</p>
            <p>Comentarios: {publicaciones.find(pub => pub._id === modalAbierto.id).comentarios.length}</p>
          </div>
        )}
      </Modal>

      {/* Modal para confirmar borrado */}
      <Modal
        isOpen={modalAbierto.tipo === "confirmarBorrado"}
        onClose={() => setModalAbierto({ tipo: null, id: null })}
      >
        <h2>Confirmar Borrado</h2>
        <p>¿Estás seguro de que quieres borrar esta publicación?</p>
        <button onClick={() => confirmarBorrado(modalAbierto.id)}>Sí, borrar</button>
        <button onClick={() => setModalAbierto({ tipo: null, id: null })}>Cancelar</button>
      </Modal>

      {/* Modal para denuncia exitosa */}
      <Modal
        isOpen={modalAbierto.tipo === "denunciaExitosa"}
        onClose={() => setModalAbierto({ tipo: null, id: null })}
      >
        <h2>Denuncia Enviada</h2>
        <p>Tu denuncia ha sido enviada con éxito.</p>
      </Modal>

      {/* Modal para denuncia fallida */}
      <Modal
        isOpen={modalAbierto.tipo === "denunciaFallida"}
        onClose={() => setModalAbierto({ tipo: null, id: null })}
      >
        <h2>Error al Denunciar</h2>
        <p>Hubo un problema al enviar tu denuncia. Por favor, intenta de nuevo más tarde.</p>
      </Modal>

      {/* Modal para borrado exitoso */}
      <Modal
        isOpen={modalAbierto.tipo === "borradoExitoso"}
        onClose={() => setModalAbierto({ tipo: null, id: null })}
      >
        <h2>Publicación Borrada</h2>
        <p>La publicación ha sido borrada con éxito.</p>
      </Modal>

      {/* Modal para borrado fallido */}
      <Modal
        isOpen={modalAbierto.tipo === "borradoFallido"}
        onClose={() => setModalAbierto({ tipo: null, id: null })}
      >
        <h2>Error al Borrar</h2>
        <p>Hubo un problema al borrar la publicación. Por favor, intenta de nuevo más tarde.</p>
      </Modal>
    </div>
  );
};

export default Publicaciones;

import React, { useState, useEffect } from 'react';
// import './ranking_content.css';

function RankingContent() {
  const [rankingImage, setRankingImage] = useState(null);
  const [rankingData, setRankingData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userID = localStorage.getItem('userID');

  useEffect(() => {
    const fetchRankingData = async () => {
        try {
            const [rankingImageResponse, rankingDataResponse] = await Promise.all([
                fetch('https://rvcurso.com.br/get.php?action=get_top_ranking'),
                fetch(`https://rvcurso.com.br/get.php?action=get_ranking&ID_aluno=${userID}`)
            ]);

            const rankingImageData = await rankingImageResponse.json();
            const ranking = await rankingDataResponse.json();

            if (rankingImageData.link_top_ranking) {
                setRankingImage(rankingImageData.link_top_ranking);
            } else {
                throw new Error('Ranking image not found');
            }

            setRankingData(ranking);
        } catch (err) {
            setError(err.message);
            console.error('Error fetching ranking data:', err);
        } finally {
            setLoading(false);
        }
    };

    fetchRankingData();
}, [userID]);

  if (loading) {
    return <div className='loading'>Carregando...</div>;
  }

  if (error) {
    return <div className='error'>Erro ao carregar dados de ranking</div>;
  }

  return (
    <div className="ranking-container">
                <div className="ranking">
                    <div className="ranking-image-container">
                        {rankingImage && (
                            <img 
                                src={rankingImage} 
                                alt="Top Ranking" 
                                className="ranking-image"
                            />
                        )}
                    </div>

                    {/* <div className='divide-line'></div>

                    <div className="ranking-details">
                        <div className='ranking-line'>
                            <div className="posicao-circle">
                                <p>{rankingData.posicao}</p>
                            </div>
                        <div className="ranking-entry">
                            <div className="rank-content">
                                <div className="rank-values">
                                <p className="nome">{rankingData.nome}</p>
                                    <p>{rankingData.posicao_natureza} | {rankingData.nota_naturezas}</p>
                                    <p>{rankingData.posicao_matematica} | {rankingData.nota_matematica}</p>
                                    <p>{rankingData.nota_geral}</p>
                                </div>
                            </div>
                        </div>

                        </div>
                    </div> */}

                </div>

                {rankingData && (
                    <div className="rank-data">
                        <div className="exam-rank">
                            <div className="prova-rank">
                                <p>Naturezas</p>
                            </div>
                            <div className="nota-rank">
                                <p>{rankingData.nota_naturezas}</p>
                            </div>
                            <div className="posicao-rank">
                                <p>{rankingData.posicao_natureza} posição</p>
                            </div>
                        </div>

                        <div className="exam-rank">
                            <div className="prova-rank">
                                <p>Matemática</p>
                            </div>
                            <div className="nota-rank">
                                <p>{rankingData.nota_matematica}</p>
                            </div>
                            <div className="posicao-rank">
                                <p>{rankingData.posicao_matematica} posição</p>
                            </div>
                        </div>

                        <div className="exam-rank">
                            <div className="prova-rank">
                                <p>Média TRI-RV</p>
                            </div>
                            <div className="nota-rank">
                                <p>{rankingData.nota_geral}</p>
                            </div>
                            <div className="posicao-rank">
                                <p>{rankingData.posicao} posição</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
  );
}

export default RankingContent;
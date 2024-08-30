import * as S from './style'

const Header = ({title}:{title:string}) => {
  return (
    <S.Container>
      <S.HeaderText>{title}</S.HeaderText>
    </S.Container>
  )
}

export default Header
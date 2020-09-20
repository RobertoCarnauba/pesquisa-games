package com.devsuperior.pesquisa.repositories;

import java.time.Instant;

import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.devsuperior.pesquisa.dto.RecordDTO;
import com.devsuperior.pesquisa.entities.Record;

@Repository
public interface RecordRepository extends JpaRepository<Record, Long> {

	@Query("SELECT obj FROM Record obj WHERE "
			+ "(coalesce(:min, null) is NULL or obj.moment >= :min) AND " 
			+ "(coalesce(:max, null) is NULL or obj.moment <= :max)")
	Page<RecordDTO> findByMoments(Instant min, Instant max, org.springframework.data.domain.Pageable pageRequest);

}
